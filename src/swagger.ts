// src/swagger.ts

import swaggerJsdoc from "swagger-jsdoc";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Flight Management API",
    version: "1.0.0",
    description: "API documentation for the Flight Management System.",
    contact: {
      name: "Akash Kumar",
      email: "Akash.email@example.com"
    },
  },
  servers: [
    {
      url: "http://localhost:5000", 
      description: "Local development server",
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/flight.routes.ts","./src/routes/booking.routes.ts","./src/routes/auth.routes.ts","./src/routes/payment.routes.ts","./src/routes/location.routes.ts",],
};

// Create swagger spec
export const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
