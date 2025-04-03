import { Request, Response } from "express";
import Flight from "../models/flight.model"; // Assuming you have a Flight model to use

// Temporary in-memory storage
const flights: Flight[] = []; 

// Create a new flight
export const createFlight = (req: Request, res: Response): Response => {
    const { airline, departure, destination, date, price } = req.body;
    const id = flights.length + 1; // Generate a numeric id
    const flight: Flight = { id: id.toString(), airline, departure, destination, date, price }; // Convert id to string
    flights.push(flight);
    return res.status(201).json(flight); // Return Response
};

// Get all flights
export const getAllFlights = (req: Request, res: Response): Response => {
    return res.json(flights); // Return Response
};

// Get a flight by ID
export const getFlightById = (req: Request, res: Response): Response => {
    const flight = flights.find(f => f.id === req.params.id); // No need to parse id, it's a string now
    if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
    }
    return res.json(flight); // Return Response
};

// Update a flight by ID
export const updateFlight = (req: Request, res: Response): Response => {
    const flight = flights.find(f => f.id === req.params.id); // Compare strings
    if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
    }

    Object.assign(flight, req.body);
    return res.json(flight); // Return Response
};

// Delete a flight by ID
export const deleteFlight = (req: Request, res: Response): Response => {
    const index = flights.findIndex(f => f.id === req.params.id); // Compare strings
    if (index === -1) {
        return res.status(404).json({ message: "Flight not found" });
    }

    flights.splice(index, 1);
    return res.json({ message: "Flight deleted" }); // Return Response
};
