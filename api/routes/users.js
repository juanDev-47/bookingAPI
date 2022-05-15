import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// testing the token behavior
// router.get("/checkAuth", verifyToken, (req, res, next) => {
//     res.send("you are authenticated!")
// });

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//     res.send("you can delete you account!")
// });

router.get("/", verifyAdmin ,getUsers);

router.get("/:id", verifyUser, getUser);

router.post("/", createUser);

router.put("/", verifyUser, updateUser);

router.delete("/", verifyUser, deleteUser);



export default router;