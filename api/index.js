'use strict';

import express from 'express';

import { UserCtrl } from './controllers';

const router = express.Router();

router.post('/users', UserCtrl.create);

router.get('/auth/:token', UserCtrl.auth);

export default router;
