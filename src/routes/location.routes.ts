import express from "express";
import { addLocation, getLocations } from "../controllers/location.controller";
import { verifyToken } from "../middleware/location.middleware"; // ✅ Use named import

const router = express.Router();

router.post("/add", verifyToken, addLocation);
router.get("/", verifyToken, getLocations);

export default router;
