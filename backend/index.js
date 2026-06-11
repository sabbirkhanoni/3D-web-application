import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import authRoute from './routes/auth.route.js';
import sceneRoute from "./routes/scene.route.js";
import session from 'express-session';

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

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, //hide cookie from client-side JavaScript
        secure: process.env.NODE_ENV === 'production', //use secure cookies in production
        maxAge: 1000 * 60 * 60 * 24, //cookie expires in 1 day
        sameSite: 'none' //allow cross-site cookies
    }
}));

app.get("/", (request, response) => {
    response.json({
        message: `Welcome to the 3D VR Application Backend API!, Backend is running on ${PORT}.`
    })
})

// Routes
app.use('/api/auth', authRoute);
app.use("/api/scene", sceneRoute);



// First Connect to MongoDB then start the server
connectDB().then(() => {
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
