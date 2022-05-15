import express from "express";
import hotelController from "../controllers/hotelsController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// created
router.post("/", verifyAdmin, hotelController.createHotel);

// updated
router.put("/:id", verifyAdmin, hotelController.updateHotel);

// eliminated
router.delete("/:id", verifyAdmin,hotelController.deleteHotel);

// get
router.get("/:id", hotelController.getHotel);

// getAll
router.get("/", hotelController.getHotels);



export default router;