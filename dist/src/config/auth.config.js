"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT_ROUNDS = exports.JWT_EXPIRE = exports.JWT_SECRET = void 0;
const config = {
    JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key-for-job-application',
    JWT_EXPIRE: '24h',
    SALT_ROUNDS: 10,
};
exports.default = config;
exports.JWT_SECRET = config.JWT_SECRET, exports.JWT_EXPIRE = config.JWT_EXPIRE, exports.SALT_ROUNDS = config.SALT_ROUNDS;
