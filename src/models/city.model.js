
const { v4: uuidv4 } = require('uuid');

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
    findAll() {
        return Promise.resolve(cities);
    }

    findById(id) {
        const city = cities.find((c) => c.id === id);
        return Promise.resolve(city || null);
    }

    create(data) {
        const newCity = {
            id: uuidv4(),
            ...data,
            createdAt: new Date().toISOString(),
        };
        cities.push(newCity);
        return Promise.resolve(newCity);
    }

    update(id, data) {
        const index = cities.findIndex((c) => c.id === id);
        if (index === -1) return Promise.resolve(null);

        cities[index] = { ...cities[index], ...data };
        return Promise.resolve(cities[index]);
    }

    delete(id) {
        const index = cities.findIndex((c) => c.id === id);
        if (index === -1) return Promise.resolve(false);

        cities.splice(index, 1);
        return Promise.resolve(true);
    }
}

module.exports = new CityModel();
