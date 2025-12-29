import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
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
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
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
    apis: ['./src/routes/*.ts'], // Updated to search for .ts files
};

const specs = swaggerJsdoc(options);
export default specs;
