import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import db from "../database/connection.js";

router.post("/auth/login", async (req, res) => {
    const {  password, email } = req.body;

    const validUser = await db.get("SELECT * FROM users WHERE email=?", [email]);
    
    if (!validUser){
        return res.send({message: "User does not exist"});
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword){
        return res.send({message: "Password not correct"});
    }

    req.session.object = { username: validUser.username, email: validUser.email, role: validUser.role_id };

    res.send(req.session);  
});

router.get("/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({message: "You logged out - BYE"});
    }); 
});

export default router;
