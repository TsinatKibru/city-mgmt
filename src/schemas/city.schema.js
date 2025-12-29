
const { z } = require('zod');

const createCitySchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        country: z.string().min(2, 'Country must be at least 2 characters'),
        population: z.number().int().nonnegative('Population must be a non-negative integer'),
    }),
});

const updateCitySchema = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        country: z.string().min(2).optional(),
        population: z.number().int().nonnegative().optional(),
    }),
});

module.exports = {
    createCitySchema,
    updateCitySchema,
};
