"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                details: err.issues, // Use .issues in newer Zod
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};
exports.default = validate;
