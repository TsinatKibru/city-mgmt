
const request = require('supertest');
const app = require('../src/app');

describe('City API', () => {
    let createdCityId;

    it('should list all cities', async () => {
        const res = await request(app).get('/api/v1/cities');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        // Expect initial seed data (2 cities)
        expect(res.body.count).toBeGreaterThanOrEqual(2);
    });

    it('should create a new city', async () => {
        const res = await request(app).post('/api/v1/cities').send({
            name: 'New York',
            country: 'USA',
            population: 8419600,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data.name).toBe('New York');
        createdCityId = res.body.data.id;
    });

    it('should fail to create a city with invalid data', async () => {
        const res = await request(app).post('/api/v1/cities').send({
            name: 'A', // Too short
            country: '',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('Validation Error');
    });

    it('should get a specific city by ID', async () => {
        const res = await request(app).get(`/api/v1/cities/${createdCityId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.id).toBe(createdCityId);
    });

    it('should return 404 for non-existent city', async () => {
        const res = await request(app).get('/api/v1/cities/non-existent-id');
        expect(res.statusCode).toEqual(404);
    });

    it('should update a city', async () => {
        const res = await request(app).put(`/api/v1/cities/${createdCityId}`).send({
            population: 8500000,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.population).toBe(8500000);
    });

    it('should delete a city', async () => {
        const res = await request(app).delete(`/api/v1/cities/${createdCityId}`);
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404 when deleting already deleted city', async () => {
        const res = await request(app).delete(`/api/v1/cities/${createdCityId}`);
        expect(res.statusCode).toEqual(404);
    });
});
