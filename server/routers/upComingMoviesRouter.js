import { Router } from "express";
const router = Router();

import db from "../database/connection.js"

router.get("/upComing", async (req, res) => {
    const upComingMovies = await db.all("select * from upcoming_movies");
    res.send({data: upComingMovies});
});

export default router;
