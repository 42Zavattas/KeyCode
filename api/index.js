'use strict';

import express from 'express';

import { UserCtrl } from './controllers';
import { AuthService } from './services';

const router = express.Router();

router.post('/users', UserCtrl.create);
router.get('/users/me', AuthService.isAuthenticated(), UserCtrl.create);

router.get('/auth/:token', UserCtrl.auth);

export default router;
