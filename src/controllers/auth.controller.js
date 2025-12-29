
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/auth.config');

// Mock user for job application demonstration
const mockUser = {
    id: 'user-1',
    email: 'admin@example.com',
    // In a real app, this would be stored hashed. We'll simulate that.
    password: 'adminpassword',
    role: 'admin',
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide an email and password',
            });
        }

        // Check for user
        if (email !== mockUser.email) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }

        // Check password
        // In a real app: const isMatch = await bcrypt.compare(password, mockUser.password);
        const isMatch = password === mockUser.password;

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }

        // Create token
        const token = jwt.sign(
            { id: mockUser.id, role: mockUser.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE }
        );

        res.status(200).json({
            success: true,
            token,
        });
    } catch (err) {
        next(err);
    }
};
