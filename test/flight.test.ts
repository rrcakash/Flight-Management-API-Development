import request from "supertest";
import app from "../src/app"; 

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
});
