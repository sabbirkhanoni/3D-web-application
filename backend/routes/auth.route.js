import Router from 'express';

import { signUpUserController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signUpUserController);

export default router;
