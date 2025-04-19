import express from "express";
import { addLocation, getLocations } from "../controllers/location.controller";
import { verifyToken } from "../middleware/location.middleware"; // Optional, keep if used

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Manage airport locations (stored in CSV)
 */

/**
 * @swagger
 * /locations/add:
 *   post:
 *     summary: Add a new airport location and save it to a CSV file
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - country
 *               - airportCode
 *               - coordinates
 *             properties:
 *               id:
 *                 type: string
 *                 example: toronto
 *               name:
 *                 type: string
 *                 example: Toronto
 *               country:
 *                 type: string
 *                 example: Canada
 *               airportCode:
 *                 type: string
 *                 example: YYZ
 *               coordinates:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                     example: 43.65107
 *                   lng:
 *                     type: number
 *                     example: -79.347015
 *     responses:
 *       201:
 *         description: Location added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/add", verifyToken, addLocation);

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all stored airport locations from CSV
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of locations
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, getLocations);

export default router;
