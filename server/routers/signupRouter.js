import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import db from "../database/connection.js";
import { sendSignupConfirmation } from "../util/nodemailer.js";


router.post("/signup", async (req, res) => {

    const { username, password, email } = req.body;
    const validUser = await db.get("SELECT * FROM users WHERE email=?", [email]);

    if (!validUser){
        const passwordHashed = await bcrypt.hash(password, 12);
        const guetsRoleId = 3;

        await db.run("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)", [username, passwordHashed, email, guetsRoleId]);
      
        // send a mail with nodemailer
        sendSignupConfirmation(username, email).catch(console.error);
        
        res.send({message: username});
    } else { 
        res.send({message: "Failed"});
    } 
});

export default router;
 