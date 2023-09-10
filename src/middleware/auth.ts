import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/auth';

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
}

async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decodedToken;
  next();
};

export default authMiddleware;