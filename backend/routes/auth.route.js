import Router from 'express';

import {
    signUpController, 
    loginController, 
    logoutController, 
    forgetPasswordRequestController,
    verifyOTPController,
    resetPasswordController
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/forgot-password', forgetPasswordRequestController);
router.post('/verify-otp', verifyOTPController);
router.post('/reset-password', resetPasswordController);

export default router;
