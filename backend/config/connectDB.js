import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in environment variables");
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
