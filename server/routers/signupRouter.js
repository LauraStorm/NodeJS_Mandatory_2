import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import db from "../database/connection.js";
import { sendSignupConfirmation } from "../util/nodemailer.js";


router.post("/signup", async (req, res) => {

    const { username, password, email } = req.body;
    const userExists = await db.get("SELECT * FROM users WHERE email=?", [email]);

    if (!userExists){
        const passwordHashed = await bcrypt.hash(password, 12);
        //console.log(passwordHashed);
        db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", [username, passwordHashed, email, 3]);
      
        // send en mail med nodemailer
        sendSignupConfirmation(username, email).catch(console.error);
        
        console.log(`Created Successfully - ${username}`);
        res.status(200).send({message: username});
    } else { 
        //  der er en user i forvejen 
        console.log("You already have an account");
        res.status(409).send({message: "Failed"});
    } 
});

export default router;
