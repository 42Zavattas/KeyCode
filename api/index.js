'use strict';

import express from 'express';
import passport from 'passport';

import { UserCtrl, LanguageCtrl, TextCtrl } from './controllers';
import { AuthService } from './services';

const router = express.Router();

router.get('/users', AuthService.isAdmin(), UserCtrl.getAll);
router.get('/users/me', AuthService.isAuthenticated(), UserCtrl.getMe);
router.put('/users/me', AuthService.isAuthenticated(), UserCtrl.putMe);
router.post('/users/me/game', AuthService.isAuthenticated(), UserCtrl.newResult);

router.get('/languages', LanguageCtrl.getAll);
router.get('/languages/:id', LanguageCtrl.getOne);
router.post('/languages', AuthService.isAdmin(), LanguageCtrl.create);

router.get('/texts', TextCtrl.getAll);
router.get('/texts/rand', TextCtrl.getRandom);
router.get('/texts/:id', TextCtrl.getOne);
router.post('/texts', AuthService.isAdmin(), TextCtrl.create);

router.get('/auth', passport.authenticate('github', {
  session: false,
  failureRedirect: '/'
}));

router.get('/auth/callback', passport.authenticate('github', {
  session: false,
  failureRedirect: '/'
}), AuthService.setToken);

export default router;
