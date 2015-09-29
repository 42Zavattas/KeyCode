'use strict';

import express from 'express';

import { UserCtrl } from './controllers';

const router = express.Router();

router.post('/users', UserCtrl.create);

export default router;
