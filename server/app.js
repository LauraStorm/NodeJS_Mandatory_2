import "dotenv/config";

import express from "express";
const app = express();

app.use(express.json());

// HELMET
import helmet from "helmet";
app.use(helmet());

// CORS
import cors from "cors";
app.use(cors({
    credentials:true,
    origin:true
}));

// SESSION
import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,                      
    saveUninitialized: true,            
    cookie: { secure: false }            
}));

// RATELIMIT 
import rateLimit from 'express-rate-limit';
const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false, 
});

app.use(apiLimiter);

app.use("/auth", rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 5, 
	standardHeaders: true, 
	legacyHeaders: false, 
}));

// MIDDLEWARES - AUTH + ROLES
function authChecker (req, res, next){
    if (!req.session.object.username){
        return res.send({message: "You are not allowed. Please login!"});
    }
    next();
}

function adminChecker(req, res, next){
    if (!req.session.object.role === 1){
        return res.send({message: "You are not allowed. Please login!"});
    }
    next();
}

function guestChecker(req, res, next ){
    if (!req.session.object.role === 3){
        return res.send({message: "You are not allowed. Please login!"});
    }
    next();
}

app.use("/profile", authChecker);
app.use("/upComing", authChecker, adminChecker);
app.use("/reviews", authChecker, guestChecker);

// IMPORT ROUTES
import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import profileRouter from "./routers/profileRouter.js";
app.use(profileRouter);

import signupRouter from "./routers/signupRouter.js";
app.use(signupRouter);

import upComingMoviesRouter from "./routers/upComingMoviesRouter.js";
app.use(upComingMoviesRouter);

import reviewsRouter from "./routers/reviewRouter.js";
app.use(reviewsRouter);

// PORTS
const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error){
        console.log(error);
    }
    console.log("Server is running on PORT: ", PORT);
});
