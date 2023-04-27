import { Router } from "express";
const router = Router();

router.get("/reviews", (req, res) => {
    res.send({message: `Hi ${req.session.object.username} you are authenticated - you can write a movie review`});
});

export default router;
