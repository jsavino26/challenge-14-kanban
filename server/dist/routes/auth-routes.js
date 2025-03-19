import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request received:', { username, password });
    try {
        // Check if the user exists in the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User not found:', username);
            return res.status(404).json({ message: 'User not found' });
        }
        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate a JWT token
        const secretKey = process.env.JWT_SECRET || '3gHtP1*3skL41@!52y7$F5pQv9xNwMzY'; // Replace 'defaultSecret' with your actual secret key
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        // Return the token to the client
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
