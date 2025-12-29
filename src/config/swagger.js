
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'City API',
            version: '1.0.0',
            description: 'A simple CRUD API for managing cities',
            contact: {
                name: 'Developer',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                City: {
                    type: 'object',
                    required: ['name', 'country', 'population'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'The auto-generated id of the city',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the city',
                        },
                        country: {
                            type: 'string',
                            description: 'The country of the city',
                        },
                        population: {
                            type: 'integer',
                            description: 'The population of the city',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date the city was added',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
