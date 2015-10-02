'use strict';

import q from 'q';
import validator from 'validator';
import nodemailer from 'nodemailer';
import uuid from 'node-uuid';
import moment from 'moment';

import { db } from '../data';
import config from '../../config';
import AuthService from './auth.service';

let transporter = nodemailer.createTransport();

exports.create = (name, email) => {

  if (!name || !email) {
    return q.reject(new Error('Missing data'));
  }

  let _user;

  return db.oneOrNone('SELECT * FROM users WHERE email = $1', email)
    .then(function (user) {

      if (user) { return user; }
      if (!validator.isEmail(email)) { throw new Error('Invalid email.'); }

      return db.one(`
        INSERT INTO users(name, email) VALUES ($1, $2) RETURNING email;
      `, [name, email]);
    })
    .then(function (user) {
      if (user.banned) { throw new Error('You are banned from KeyCode.'); }
      if (user.lognupat && moment().diff(user.lognupat, 'minutes') < 10) { throw new Error('You already tried authenticating less than 10 minutes ago.'); }

      _user = user;
      _user.token = uuid.v4();

      return db.none(`
        UPDATE users SET lognup = $1, lognupat = $2 WHERE id = $3;
      `, [_user.token, moment(), _user.id]);
    })
    .then(function () {

      return q.nfcall(transporter.sendMail.bind(transporter), {
        from: 'bgronon@gmail.com',
        to: _user.email,
        subject: 'Authentication',
        html: [
          'Hello ' + _user.name + ',<br><br>',
          'To complete your login on <strong>KeyCode</strong>, please follow ',
          '<a href="',
          config.env === 'prod' ? 'http://keycode.sh/api/auth/' : 'http://localhost:3000/api/auth/',
          _user.token,
          '">This link</a>.'
        ].join('')
      });

    });

};

exports.auth = (token) => {

  let _user;

  return db.oneOrNone('SELECT * FROM users WHERE lognup = $1', token)
    .then(function (user) {
      if (!token || !user) { throw new Error('No matching user.'); }
      if (!moment().diff(user.lognupat, 'minutes') < 10) { throw new Error('Token expired.'); }
      _user = user;

      return db.none('UPDATE users SET lognup = null WHERE id = $1', user.id);
    })
    .then(function () {
      return AuthService.signToken(_user.id);
    });

};
