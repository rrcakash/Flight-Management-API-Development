import request from "supertest";
import express, { Application } from "express";
import fs from "fs";
import path from "path";
import * as csvWriter from "csv-writer";
import { addLocation, getLocations } from "../src/controllers/location.controller";

// Mock required modules
jest.mock("fs");
jest.mock("csv-writer");

const app: Application = express();
app.use(express.json());
app.post("/locations", addLocation);
app.get("/locations", getLocations);

// Silence console.error
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalConsoleError;
});

describe("Location Controller", () => {
  const mockLocation = {
    id: "LOC001",
    name: "Toronto Pearson",
    country: "Canada",
    airportCode: "YYZ",
    coordinates: { lat: 43.6777, lng: -79.6248 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /locations", () => {
    it("should return 400 if location data is invalid", async () => {
      const invalidLocation = { ...mockLocation, coordinates: null };

      const response = await request(app).post("/locations").send(invalidLocation);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it("should return 500 on CSV write error", async () => {
      const mockWriteRecords = jest.fn().mockRejectedValue(new Error("Write failed"));
      (csvWriter.createObjectCsvWriter as jest.Mock).mockReturnValue({
        writeRecords: mockWriteRecords,
      });

      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const response = await request(app).post("/locations").send(mockLocation);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to save to CSV");
    });
  });

  describe("GET /locations", () => {
    it("should return an empty list if CSV does not exist", async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const response = await request(app).get("/locations");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return parsed locations from CSV", async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const csvMock = [
        "ID,Name,Country,Airport Code,Latitude,Longitude",
        "LOC001,Toronto Pearson,Canada,YYZ,43.6777,-79.6248",
      ].join("\n");

      (fs.readFileSync as jest.Mock).mockReturnValue(csvMock);

      const response = await request(app).get("/locations");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: "LOC001",
          name: "Toronto Pearson",
          country: "Canada",
          airportCode: "YYZ",
          coordinates: { lat: 43.6777, lng: -79.6248 },
        },
      ]);
    });

    it("should return 500 if reading CSV fails", async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error("Read failed");
      });

      const response = await request(app).get("/locations");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to load locations");
    });
  });
});
