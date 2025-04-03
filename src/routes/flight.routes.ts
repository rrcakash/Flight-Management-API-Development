const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flight.controller");

router.post("/", flightController.createFlight);
router.get("/", flightController.getAllFlights);
router.get("/:id", flightController.getFlightById);
router.put("/:id", flightController.updateFlight);
router.delete("/:id", flightController.deleteFlight);

module.exports = router;
