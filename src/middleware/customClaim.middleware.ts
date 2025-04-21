import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebase';
export const decodeTokenAndAttachClaims = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const role = decodedToken.role || decodedToken['role']; 

    if (!role) {
      res.status(403).json({ error: 'User role is not set in custom claims.' });
      return;
    }

    (req as any).user = { uid, email, role };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};