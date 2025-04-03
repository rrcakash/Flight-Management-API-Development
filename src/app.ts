import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const flightRoutes = require("./routes/flight.routes");

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/flights", flightRoutes);

// Route
app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "Flight Management API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
