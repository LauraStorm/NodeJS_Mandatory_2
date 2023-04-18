import { Router } from "express";
const router = Router();

router.get("/contact", (req, res) => {
    res.send({message: `Welcome ${req.session.username} to Contact Page - Write a message`})
});

export default router;