import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const user = await authService.registerUser(email, password, role);
    res.status(201).json({ message: 'User registered', user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  try {
    const user = await authService.loginUser(idToken);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(401).json({ error: message });
  }
};