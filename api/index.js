'use strict';

import express from 'express';
import passport from 'passport';

import { UserCtrl } from './controllers';
import { AuthService } from './services';

const router = express.Router();

router.get('/users/me', AuthService.isAuthenticated(), UserCtrl.getMe);
router.put('/users/me', AuthService.isAuthenticated(), UserCtrl.putMe);

router.get('/auth', passport.authenticate('github', {
  session: false,
  failureRedirect: '/'
}));

router.get('/auth/callback', passport.authenticate('github', {
  session: false,
  failureRedirect: '/'
}), AuthService.setToken);

export default router;
