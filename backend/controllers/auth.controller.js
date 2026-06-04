import { request } from 'express';
import {
    signUpService,
    loginService,
    forgetPasswordRequestService,
    verifyOTPService,
    resetPasswordService
} from '../services/auth.service.js';

export const signUpController = async (request, response) => {
    try {
        await signUpService(request.body);
        return response.status(201).json({
            message: 'Registration successfully',
            error: null,
            success: true,
        })
    } catch (error) {
        return response.status(400).json({
            message: 'Registration failed',
            error: error.message,
            success: false,
        })
    }
}

export const loginController = async (request, response) => {
    try {
        const user = await loginService(request.body);

        // Store user ID in session
        request.session.userId = user.user._id;
        return response.status(200).json({
            message: 'Login successfully',
            error: null,
            success: true,
        })
    } catch (error) {
        return response.status(400).json({
            message: 'Login failed',
            error: error.message,
            success: false,
        })
    }
}

export const logoutController = (request, response) => {
    request.session.destroy((err) => {
        if (err) {
            return response.status(500).json({
                message: 'Logout failed',
                error: err.message,
                success: false,
            });
        }
        return response.status(200).json({
            message: 'Logout successful',
            error: null,
            success: true,
        });
    });
}

export const forgetPasswordRequestController = async (request, response) => {
    try {
        await forgetPasswordRequestService(request.body);
        return response.status(200).json({
            message: 'OTP sent to your email successfully',
            error: null,
            success: true,
        })
    } catch (error) {
        return response.status(400).json({
            message: 'Forget password request failed',
            error: error.message,
            success: false,
        })
    }
}

export const verifyOTPController = async (request, response) => {
    try {
        await verifyOTPService(request.body);
        return response.status(200).json({
            message: 'OTP verified successfully',
            error: null,
            success: true,
        })
    } catch (error) {
        return response.status(400).json({
            message: 'OTP verification failed',
            error: error.message,
            success: false,
        })
    }
}


export const resetPasswordController = async (request, response) => {
    try {
        await resetPasswordService(request.body);
        return response.status(200).json({
            message: 'Password reset successfully',
            error: null,
            success: true,
        })
    } catch (error) {
        return response.status(400).json({
            message: 'Password reset failed',
            error: error.message,
            success: false,
        })
    }
}
