import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE } from '../config/auth.config';

// Mock user for job application demonstration
const mockUser = {
    id: 'user-1',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin',
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide an email and password',
            });
        }

        if (email !== mockUser.email) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }

        const isMatch = password === mockUser.password;

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }

        const options: SignOptions = {
            expiresIn: JWT_EXPIRE as any, // Cast because of specific library type requirements
        };

        const token = jwt.sign(
            { id: mockUser.id, role: mockUser.role },
            JWT_SECRET as Secret,
            options
        );

        res.status(200).json({
            success: true,
            token,
        });
    } catch (err) {
        next(err);
    }
};
