"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const city_model_1 = __importDefault(require("../models/city.model"));
class CityService {
    async getAllCities() {
        return await city_model_1.default.findAll();
    }
    async getCityById(id) {
        const city = await city_model_1.default.findById(id);
        if (!city) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return city;
    }
    async createCity(data) {
        return await city_model_1.default.create(data);
    }
    async updateCity(id, data) {
        const updatedCity = await city_model_1.default.update(id, data);
        if (!updatedCity) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return updatedCity;
    }
    async deleteCity(id) {
        const deleted = await city_model_1.default.delete(id);
        if (!deleted) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return { message: 'City deleted successfully' };
    }
}
exports.default = new CityService();
