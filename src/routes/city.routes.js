
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/city.controller');
const validate = require('../middlewares/validate.middleware');
const { createCitySchema, updateCitySchema } = require('../schemas/city.schema');

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
 *     summary: Returns the list of all the cities
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
 *   post:
 *     summary: Create a new city
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
 */
router
    .route('/')
    .get(cityController.getCities)
    .post(validate(createCitySchema), cityController.createCity);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     summary: Get the city by id
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
 *   put:
 *     summary: Update the city by the id
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
 *   delete:
 *     summary: Remove the city by id
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
 */
router
    .route('/:id')
    .get(cityController.getCity)
    .put(validate(updateCitySchema), cityController.updateCity)
    .delete(cityController.deleteCity);

module.exports = router;
