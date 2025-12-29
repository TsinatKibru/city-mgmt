"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
// Mock user for job application demonstration
const mockUser = {
    id: 'user-1',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin',
};
const login = async (req, res, next) => {
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
        const options = {
            expiresIn: auth_config_1.JWT_EXPIRE, // Cast because of specific library type requirements
        };
        const token = jsonwebtoken_1.default.sign({ id: mockUser.id, role: mockUser.role }, auth_config_1.JWT_SECRET, options);
        res.status(200).json({
            success: true,
            token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
