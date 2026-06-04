import { signUpUserService } from '../services/auth.service.js';

export const signUpUserController = async (request, response) => {
    try {
        await signUpUserService(request.body);
        return response.status(201).json({
            message: 'User created successfully',
            error: null,
            success: true,
        })
    } catch (error) {
        return response.status(400).json({
            message: 'User creation failed',
            error: error.message,
            success: false,
        })
    }
}

