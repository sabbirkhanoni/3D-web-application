import Router from 'express';

import { signUpController, loginController, logoutController, forgetPasswordRequestController} from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/forgot-password', forgetPasswordRequestController);

export default router;
