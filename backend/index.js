import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import authRoute from './routes/auth.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT
const ORIGIN = process.env.FRONTEND_URL

//cors middleware
app.use(cors({
    credentials: true,
    origin: ORIGIN
}))

//body parser middleware
app.use(express.json())
//morgan middleware for logging
app.use(morgan('dev'))

app.get("/", (request, response) => {
    response.json({
        message: `Welcome to the 3D VR Application Backend API!, Backend is running on ${PORT}.`
    })
})

// Routes
app.use('/api/auth', authRoute);



// First Connect to MongoDB then start the server
connectDB().then(() => {
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
