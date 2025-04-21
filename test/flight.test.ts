import request from "supertest";
import app from "../src/app";

jest.mock("../src/middleware/customClaim.middleware", () => ({
  decodeTokenAndAttachClaims: (req: any, _res: any, next: any) => {
    req.user = { uid: "mock-user-id", email: "test@example.com", role: "admin" };
    next();
  },
}));

jest.mock("../src/middleware/authorize", () => {
  return () => (_req: any, _res: any, next: any) => next();
});

describe("Flight API", () => {
  let flightId: string;

  it("should create a new flight", async () => {
    const response = await request(app).post("/flights").send({
      airline: "Air India",
      departure: "New Delhi",
      destination: "London",
      date: "2025-04-10",
      price: 500,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    flightId = response.body.id;
  });

  it("should get all flights", async () => {
    const response = await request(app).get("/flights");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get flight by ID", async () => {
    const response = await request(app).get(`/flights/${flightId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(flightId);
  });

  it("should update flight by ID", async () => {
    const response = await request(app)
      .put(`/flights/${flightId}`)
      .send({ price: 600 });

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(600);
  });

  it("should delete flight by ID", async () => {
    const response = await request(app).delete(`/flights/${flightId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Flight deleted");
  });

  it("should return 404 for a non-existing flight", async () => {
    const response = await request(app).get("/flights/9999");
    expect(response.status).toBe(404);
  });

  it("should return 404 when trying to update a non-existing flight", async () => {
    const response = await request(app).put("/flights/invalid-id").send({ price: 700 });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Flight not found");
  });

  it("should return 404 when trying to delete a non-existing flight", async () => {
    const response = await request(app).delete("/flights/invalid-id");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Flight not found");
  });

  it("should return flights with correct structure", async () => {
    const response = await request(app).post("/flights").send({
      airline: "Qatar Airways",
      departure: "Doha",
      destination: "Toronto",
      date: "2025-06-01",
      price: 999,
    });

    expect(response.status).toBe(201);
    const getAll = await request(app).get("/flights");
    expect(getAll.status).toBe(200);
    const createdFlight = getAll.body.find((f: any) => f.airline === "Qatar Airways");
    expect(createdFlight).toHaveProperty("airline");
    expect(createdFlight).toHaveProperty("departure");
    expect(createdFlight).toHaveProperty("destination");
    expect(createdFlight).toHaveProperty("date");
    expect(createdFlight).toHaveProperty("price");
  });
});

