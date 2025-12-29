
const cityModel = require('../models/city.model');

class CityService {
    async getAllCities() {
        return await cityModel.findAll();
    }

    async getCityById(id) {
        const city = await cityModel.findById(id);
        if (!city) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return city;
    }

    async createCity(data) {
        return await cityModel.create(data);
    }

    async updateCity(id, data) {
        const updatedCity = await cityModel.update(id, data);
        if (!updatedCity) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return updatedCity;
    }

    async deleteCity(id) {
        const deleted = await cityModel.delete(id);
        if (!deleted) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return { message: 'City deleted successfully' };
    }
}

module.exports = new CityService();
