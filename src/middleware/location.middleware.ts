import { Request, Response, NextFunction } from "express";
import { admin } from "../config/firebase";


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken; // You can use a custom type if needed
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ error: "Forbidden: Invalid or expired token" });
  }
};
