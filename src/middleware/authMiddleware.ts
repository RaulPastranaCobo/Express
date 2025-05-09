import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/userInterface';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, SECRET_KEY, (err: jwt.VerifyErrors | null, decoded: unknown) => {
    if (err) return res.status(403).json({ message: 'Token inválido o expirado' });

    req.user = decoded as User;
    next();
  });
};
