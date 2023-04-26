import { Router } from "express";
const router = Router();

router.get("/profile", (req, res) => {
    res.send({message: `Welcome ${req.session.email} to Profile Page `})
});

export default router;