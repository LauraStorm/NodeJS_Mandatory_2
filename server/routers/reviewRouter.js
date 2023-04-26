import { Router } from "express";
const router = Router();

router.get("/reviews", (req, res) => {
    res.send({message: `Hi ${req.session.username}- you can write a review`});
});

export default router;