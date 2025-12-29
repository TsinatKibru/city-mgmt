"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cityController = __importStar(require("../controllers/city.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const city_schema_1 = require("../schemas/city.schema");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: The cities managing API
 */
/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Returns the list of all the cities (Public)
 *     description: Accessible by anyone. Does not require authentication.
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: The list of the cities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/City'
 */
router.get('/', cityController.getCities);
/**
 * @swagger
 * /cities:
 *   post:
 *     summary: Create a new city (Admin Only)
 *     description: Requires a valid JWT with 'admin' role.
 *     security:
 *       - bearerAuth: []
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - country
 *               - population
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               population:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created city
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/City'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth_middleware_1.protect, (0, auth_middleware_1.authorize)('admin'), (0, validate_middleware_1.default)(city_schema_1.createCitySchema), cityController.createCity);
/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     summary: Get the city by id (Public)
 *     description: Accessible by anyone. Does not require authentication.
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 *     responses:
 *       200:
 *         description: The city description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/City'
 *       404:
 *         description: City not found
 */
router.get('/:id', cityController.getCity);
/**
 * @swagger
 * /cities/{id}:
 *   put:
 *     summary: Update the city by the id (Admin Only)
 *     description: Requires a valid JWT with 'admin' role.
 *     security:
 *       - bearerAuth: []
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               population:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The city was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/City'
 *       404:
 *         description: City not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', auth_middleware_1.protect, (0, auth_middleware_1.authorize)('admin'), (0, validate_middleware_1.default)(city_schema_1.updateCitySchema), cityController.updateCity);
/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     summary: Remove the city by id (Admin Only)
 *     description: Requires a valid JWT with 'admin' role.
 *     security:
 *       - bearerAuth: []
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 *     responses:
 *       200:
 *         description: The city was deleted
 *       404:
 *         description: City not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth_middleware_1.protect, (0, auth_middleware_1.authorize)('admin'), cityController.deleteCity);
exports.default = router;
