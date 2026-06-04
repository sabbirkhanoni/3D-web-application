import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';
import sendEmail from '../config/sendEmail.js';
import OTPSendingTemplate from '../utils/OTPSendingTemplate.js';


export const signUpService = async (payload) => {
    const {name, email, password } = payload;

    if (!name || !email || !password) {
        throw new Error('Name, email and password are required');
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,26}$/;
    if (!passwordRegex.test(password)) {
        throw new Error('Password must be 6-26 characters long and contain at least one letter and one number');
    }

    const user = await UserModel.findOne({ email });
    if (user) {
        throw new Error('User already exists');
    }

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
    });
    await newUser.save();
}

export const loginService = async (payload) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }


    // Return user data without hashed password
    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
    }
}

export const forgetPasswordRequestService = async (payload) => {
    const { email } = payload;

    if (!email) {
        throw new Error('Email is required');
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Generate OTP and set expiry time
    user.otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await UserModel.findByIdAndUpdate(user._id, {
         otp: user.otp,
         otpExpiry: user.otpExpiry 
    });

    //after save into database now send email
    await sendEmail({
        sendTo : email,
        subject : "Forgot Password OTP from VR Application",
        html : OTPSendingTemplate({
            name : user.name,
            otp : user.otp
        }),
    })
}
