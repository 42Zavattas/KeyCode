'use strict';

import q from 'q';
import validator from 'validator';
import nodemailer from 'nodemailer';
import uuid from 'node-uuid';
import moment from 'moment';

import { db } from '../data';
import config from '../../config';

let transporter = nodemailer.createTransport();

exports.getById = (id) => {
  return db.one('SELECT * FROM users WHERE id = $1', id)
    .catch(err => {
      throw new Error('No such user.');
    });
};

exports.create = (email) => {

  if (!email || email.length < 4 || !validator.isEmail(email)) {
    return q.reject(new Error('Invalid email.'));
  }

  let _user;

  return db.oneOrNone('SELECT * FROM users WHERE email = $1', email)
    .then(user => {

      if (user) { return user; }

      return db.one(`
        INSERT INTO users(email) VALUES ($1) RETURNING email;
      `, email);
    })
    .then(user => {
      if (user.banned) { throw new Error('You are banned from KeyCode.'); }
      if (user.lognupat && moment().diff(user.lognupat, 'minutes') < 10) { throw new Error('You already tried authenticating less than 10 minutes ago.'); }

      _user = user;
      _user.token = uuid.v4();

      return db.none(`
        UPDATE users SET lognup = $1, lognupat = $2 WHERE id = $3;
      `, [_user.token, moment(), _user.id]);
    })
    .then(() => {

      return q.nfcall(transporter.sendMail.bind(transporter), {
        from: 'bgronon@gmail.com',
        to: _user.email,
        subject: 'Authentication',
        html: [
          'Hello ' + (_user.name ? _user.name : 'Anonymous') + ',<br><br>',
          'To complete your login on <strong>KeyCode</strong>, please follow ',
          '<a href="',
          config.env === 'prod' ? 'http://keycode.sh/api/auth/' : 'http://localhost:3000/api/auth/',
          _user.token,
          '">This link</a>.'
        ].join('')
      });

    });

};
