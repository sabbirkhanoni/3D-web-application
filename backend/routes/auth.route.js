import Router from 'express';

import { signUpController, loginController, logoutController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);

export default router;
