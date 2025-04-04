// src/routes/flight.routes.ts

import express from "express";
import { createFlight, getAllFlights, getFlightById, updateFlight, deleteFlight } from "../controllers/flight.controller";

const router = express.Router();

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               airline:
 *                 type: string
 *               departure:
 *                 type: string
 *               destination:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Flight created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createFlight);

/**
 * @swagger
 * /flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: A list of all flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   airline:
 *                     type: string
 *                   departure:
 *                     type: string
 *                   destination:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   price:
 *                     type: number
 *                     format: float
 */
router.get("/", getAllFlights);

/**
 * @swagger
 * /flights/{id}:
 *   get:
 *     summary: Get a flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the flight to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A flight object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 airline:
 *                   type: string
 *                 departure:
 *                   type: string
 *                 destination:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 price:
 *                   type: number
 *                   format: float
 *       404:
 *         description: Flight not found
 */
router.get("/:id", getFlightById);

/**
 * @swagger
 * /flights/{id}:
 *   put:
 *     summary: Update a flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the flight to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               airline:
 *                 type: string
 *               departure:
 *                 type: string
 *               destination:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Flight updated successfully
 *       404:
 *         description: Flight not found
 */
router.put("/:id", updateFlight);

/**
 * @swagger
 * /flights/{id}:
 *   delete:
 *     summary: Delete a flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the flight to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Flight deleted successfully
 *       404:
 *         description: Flight not found
 */
router.delete("/:id", deleteFlight);

export default router;
