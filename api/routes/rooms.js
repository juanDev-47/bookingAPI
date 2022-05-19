import express from "express";
import roomsController from "../controllers/roomsController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// created
router.post("/:hotelId", verifyAdmin, roomsController.createRoom);

// updated
router.put("/:id", verifyAdmin, roomsController.updateRoom);

// eliminated
router.delete("/:id/:hotelId", verifyAdmin,roomsController.deleteRoom);

// get
router.get("/:id", roomsController.getRooms);

// getAll
router.get("/", roomsController.getRoom);



export default router;