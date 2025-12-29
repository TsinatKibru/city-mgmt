"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('City API', () => {
    let createdCityId;
    let token;
    beforeAll(async () => {
        // Login to get token for protected routes
        const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/auth/login').send({
            email: 'admin@example.com',
            password: 'adminpassword',
        });
        token = res.body.token;
    });
    it('should list all cities', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/v1/cities');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        // Expect initial seed data (2 cities)
        expect(res.body.count).toBeGreaterThanOrEqual(2);
    });
    it('should fail to create a city without a token', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/cities').send({
            name: 'London',
            country: 'UK',
            population: 8982000,
        });
        expect(res.statusCode).toEqual(401);
    });
    it('should create a new city with a valid token', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/cities')
            .set('Authorization', `Bearer ${token}`)
            .send({
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
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/cities')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'A', // Too short
            country: '',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('Validation Error');
    });
    it('should get a specific city by ID', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get(`/api/v1/cities/${createdCityId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.id).toBe(createdCityId);
    });
    it('should return 404 for non-existent city', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/v1/cities/non-existent-id');
        expect(res.statusCode).toEqual(404);
    });
    it('should update a city', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/v1/cities/${createdCityId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            population: 8500000,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.population).toBe(8500000);
    });
    it('should delete a city', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/v1/cities/${createdCityId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should return 404 when deleting already deleted city', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/v1/cities/${createdCityId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
    });
});
