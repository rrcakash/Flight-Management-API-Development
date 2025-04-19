import { Request, Response } from "express";
import { locationSchema } from "../validators/location.validator";
import fs from "fs";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";
import { Location } from "../models/location.model";

const csvPath = path.join(__dirname, "../../data/locations.csv");

// Ensure the /data folder exists
if (!fs.existsSync(path.dirname(csvPath))) {
  fs.mkdirSync(path.dirname(csvPath), { recursive: true });
}

// Setup CSV writer
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

// ✅ DO NOT "return res" — just call res.status().json(...)
export const addLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = locationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const location: Location = { ...value };

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

    res.status(201).json({ message: "✅ Location saved to CSV", location });
  } catch (err) {
    console.error("❌ CSV write failed:", err);
    res.status(500).json({ error: "Failed to save to CSV" });
  }
};

export const getLocations = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (!fs.existsSync(csvPath)) {
      res.status(200).json([]);
      return;
    }

    const csvData = fs.readFileSync(csvPath, "utf8");
    const rows = csvData.split("\n").slice(1).filter(Boolean); // skip header

    const locations = rows.map((line) => {
      const [id, name, country, airportCode, lat, lng] = line.split(",");
      return {
        id,
        name,
        country,
        airportCode,
        coordinates: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      };
    });

    res.status(200).json(locations);
  } catch (err) {
    console.error("❌ Failed to read CSV:", err);
    res.status(500).json({ error: "Failed to load locations" });
  }
};
