import express from "express";

const router = express.Router();


router.get("/", (req, res) => {
    res.send("from rooms router")
});


export default router;