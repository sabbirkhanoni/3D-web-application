import Router from 'express';

import {
    signUpController, 
    loginController, 
    logoutController, 
    forgetPasswordRequestController,
    verifyOTPController,
    resetPasswordController,
    getMeController
} from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = Router();

//only authenticated user can access this route
router.get('/me', isAuthenticated, getMeController);

// Public routes
router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/forgot-password', forgetPasswordRequestController);
router.post('/verify-otp', verifyOTPController);
router.post('/reset-password', resetPasswordController);

export default router;
