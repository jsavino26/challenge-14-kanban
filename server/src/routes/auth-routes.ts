import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log('Login request received:', { username, password });

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('Invalid login attempt:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '12h' });

    // Return the token to the client
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  

  try {
    // Check if the user exists in the database
    const user = await User.create(req.body);
    

    // Generate a JWT token
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '12h' });

    // Return the token to the client
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

router.post('/register', createUser);

export default router;
