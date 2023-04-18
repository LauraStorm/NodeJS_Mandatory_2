/* --------- DOTENV --------- */
import dotenv from "dotenv";
dotenv.config();

/* --------- EXPRESS --------- */
import express, { urlencoded } from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* --------- PATH TO CLIENT --------- */
import path from "path"
app.use(express.static(path.resolve("../client/dist")));

/* --------- HELMET --------- */
import helmet from "helmet";
app.use(helmet());

/* --------- CORS --------- */
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
    console.log("I am auth checker - middleware");
    if(!req.session.username){
        return res.send({message: "You are not allowed. Please login!"});
    }
    next();
}

app.use("/contact", checkAuth);

/* --------- ROUTES --------- */
import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import contactRouter from "./routers/contactRouter.js";
app.use(contactRouter);


/* --------- PORT --------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if(error){
        console.log(error);
    }
    console.log("Server is running on PORT: ", PORT);
});
