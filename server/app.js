import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

app.use(express.json());

import helmet from "helmet";
app.use(helmet());

import cors from "cors";
app.use(cors({
    credentials:true,
    origin:true
}));

/* --------- SESSION --------- */
import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,                      
    saveUninitialized: true,            
    cookie: { secure: false }            
}));

/* --------- RATE LIMIT ON ENDPOINTS --------- */
import rateLimit from 'express-rate-limit';
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false, 
});
app.use(apiLimiter);

app.use("/auth", rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
}));

/* --------- MIDDLEWARES --------- */
function checkAuth (req, res, next){
    console.log("I am auth checker");
    if(!req.session.username){
        console.log(" message: You are not allowed. Please login!");
        return res.send({message: "You are not allowed. Please login!"});
    }
    next();
}
app.use("/profile", checkAuth);

function adminChecker(req, res, next){
    console.log("I am admin checker");
    if(!req.session.role === 1){
        console.log("You are not allowed - you are not an admin");
        return res.send({message: "You are not allowed. Please login!"});
    }
    next();
}
app.use("/upComing", checkAuth, adminChecker);

function guestChecker(req, res, next){
    console.log("I am guest checker");
    if(!req.session.role === 3){
        console.log("You are not allowed - you are not login");
        return res.send({message: "You are not allowed. Please login!"});
    }
    next();
}
app.use("/reviews", checkAuth, guestChecker);

/* --------- ROUTES --------- */
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

/* --------- PORT --------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if(error){
        console.log(error);
    }
    console.log("Server is running on PORT: ", PORT);
});
