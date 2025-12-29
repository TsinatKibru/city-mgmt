"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
let cities = [
    {
        id: '1',
        name: 'Tokyo',
        country: 'Japan',
        population: 37400068,
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Delhi',
        country: 'India',
        population: 29399141,
        createdAt: new Date().toISOString(),
    },
];
class CityModel {
    async findAll() {
        return cities;
    }
    async findById(id) {
        const city = cities.find((c) => c.id === id);
        return city || null;
    }
    async create(data) {
        const newCity = {
            id: (0, uuid_1.v4)(),
            ...data,
            createdAt: new Date().toISOString(),
        };
        cities.push(newCity);
        return newCity;
    }
    async update(id, data) {
        const index = cities.findIndex((c) => c.id === id);
        if (index === -1)
            return null;
        cities[index] = { ...cities[index], ...data };
        return cities[index];
    }
    async delete(id) {
        const index = cities.findIndex((c) => c.id === id);
        if (index === -1)
            return false;
        cities.splice(index, 1);
        return true;
    }
}
exports.default = new CityModel();
