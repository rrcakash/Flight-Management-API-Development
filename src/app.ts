import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import flightRoutes from "./routes/flight.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import bookingRoutes from "./routes/booking.routes";
dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/flights", flightRoutes);
app.use("/bookings", bookingRoutes);
// Serve Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route
app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "Flight Management API is running!" });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the server instance for testing purposes
export default server;
