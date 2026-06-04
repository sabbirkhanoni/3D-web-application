import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';


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