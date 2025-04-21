import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebase';

interface RoleCheckOptions {
  hasRole: string[];
}

const isAuthorized = ({ hasRole }: RoleCheckOptions) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Missing token' });
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      (req as any).user = decodedToken;

      const userRole = decodedToken.role;
      if (!userRole || !hasRole.includes(userRole)) {
        res.status(403).json({ error: 'Forbidden: Insufficient role' });
        return;
      }

      next();
    } catch (error) {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
};

export default isAuthorized;