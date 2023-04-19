import { Router } from "express";
const router = Router();

import { confirmSignUp } from "../util/nodemailer.js";

const users = [
    { username: "lbs", password: 123, email: "lbl@mail.com" },
    { username: "admin", password: 456, email: "admin@mail.com" }
];

router.post("/signup", async (req, res) => {

    const { username, password, email } = req.body;
    const userExist = users.find(user => user.email === email);

    if (!userExist){
        const newUser = {
            username: username,
            email: email
        }
        // hvis user ikke eksisterer - så skal useren gemmes i DB 

        // bcrypt password

        // insert sql statement med bruger oplysninger
        
        
        // send en mail med: confirmSignUp(username, email)
        confirmSignUp(username, email).catch(console.error);
        res.send({newUser});
    } else { 
        // tjek om der er user i forvejen i DB evt. på email.
        res.send({message: "You already have an account"});

    } 
});

export default router;