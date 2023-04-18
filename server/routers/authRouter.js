import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";

/* --- DB INFO--- */

const userOnePasswordPlaintext = "kage123";
const userOnehashedPasword = await bcrypt.hash(userOnePasswordPlaintext, 12);

const userTwoPasswordPlaintext = "admin123";
const userTwohashedPasword = await bcrypt.hash(userTwoPasswordPlaintext, 12);

const users = [
    { username: "lbs", password: userOnehashedPasword },
    { username: "admin", password: userTwohashedPasword }
];

/* ---------- */

router.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    const validUser = users.find(user => user.username === username);
    //console.log("valid user: ", validUser);

    if(!validUser){
        return res.send({message: "User does not exist"});
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    //console.log("valid password: ", validPassword);

    if(!validPassword){
        return res.send({message: "Password not correct"});
    }
    req.session.username = validUser.username
    res.send({message: "YAY - you are logged in"});

});

router.get("/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({message: "You logged out - BYE"})
    }); 
});

export default router;
