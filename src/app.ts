import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import flightRoutes from "./routes/flight.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import bookingRoutes from "./routes/booking.routes";
import authRoutes from './routes/auth.routes';
import paymentRoutes from './routes/payment.routes';
import locationRoutes from "./routes/location.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/flights", flightRoutes);
app.use("/bookings", bookingRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/', paymentRoutes);
app.use("/api/v1/locations", locationRoutes);

app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "Flight Management API is running!" });
});

export default app;
