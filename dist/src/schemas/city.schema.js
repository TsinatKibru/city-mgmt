"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCitySchema = exports.createCitySchema = void 0;
const zod_1 = require("zod");
exports.createCitySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        country: zod_1.z.string().min(2, 'Country must be at least 2 characters'),
        population: zod_1.z.number().int().nonnegative('Population must be a non-negative integer'),
    }),
});
exports.updateCitySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        country: zod_1.z.string().min(2).optional(),
        population: zod_1.z.number().int().nonnegative().optional(),
    }),
});
