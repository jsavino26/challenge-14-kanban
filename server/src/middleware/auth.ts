import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || '3gHtP1*3skL41@!52y7$F5pQv9xNwMzY'; // Replace 'defaultSecret' with your actual secret key
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Attach the user data to the request object
    req.user = { username: decoded.username };
    next(); // Pass control to the next middleware or route handler
    return; // Explicitly return after calling next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};