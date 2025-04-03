import { Request, Response } from "express";
import Flight from "../models/flight.model"; 

// Temporary in-memory storage
const flights: Flight[] = [];

// Create a new flight
export const createFlight = (req: Request, res: Response): void => {
    const { airline, departure, destination, date, price } = req.body;
    const id = (flights.length + 1).toString(); // Generate a numeric ID as a string
    const flight = new Flight(id, airline, departure, destination, new Date(date), price);
    flights.push(flight);
    res.status(201).json(flight);
};

// Get all flights
export const getAllFlights = (req: Request, res: Response): void => {
    res.json(flights);
};

// Get a flight by ID
export const getFlightById = (req: Request, res: Response): void => {
    const flight = flights.find(f => f.id === req.params.id);
    if (!flight) {
        res.status(404).json({ message: "Flight not found" });
        return;
    }
    res.json(flight);
};

// Update a flight by ID
export const updateFlight = (req: Request, res: Response): void => {
    const flight = flights.find(f => f.id === req.params.id);
    if (!flight) {
        res.status(404).json({ message: "Flight not found" });
        return;
    }

    Object.assign(flight, req.body);
    res.json(flight);
};

// Delete a flight by ID
export const deleteFlight = (req: Request, res: Response): void => {
    const index = flights.findIndex(f => f.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ message: "Flight not found" });
        return;
    }

    flights.splice(index, 1);
    res.json({ message: "Flight deleted" });
};
