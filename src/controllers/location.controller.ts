import { Request, Response } from "express";
import { db } from "../config/firebase";
import { locationSchema } from "../validators/location.validator";
import fs from "fs";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";
import { Location } from "../models/location.model";

const csvPath = path.join(__dirname, "../../data/locations.csv");

const csvWriter = createObjectCsvWriter({
  path: csvPath,
  header: [
    { id: "id", title: "ID" },
    { id: "name", title: "Name" },
    { id: "country", title: "Country" },
    { id: "airportCode", title: "Airport Code" },
    { id: "lat", title: "Latitude" },
    { id: "lng", title: "Longitude" },
  ],
  append: fs.existsSync(csvPath),
});

export const addLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = locationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const location: Location = {
      ...value,
    };

    await db.collection("locations").doc(location.id).set(location);

    await csvWriter.writeRecords([
      {
        id: location.id,
        name: location.name,
        country: location.country,
        airportCode: location.airportCode,
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      },
    ]);

    res.status(201).json({ message: "Location added successfully", location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add location" });
  }
};

export const getLocations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await db.collection("locations").get();
    const locations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};
