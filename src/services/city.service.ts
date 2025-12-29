import cityModel from '../models/city.model';
import { City, CreateCityDto, UpdateCityDto } from '../types';

class CityService {
    async getAllCities(): Promise<City[]> {
        return await cityModel.findAll();
    }

    async getCityById(id: string): Promise<City> {
        const city = await cityModel.findById(id);
        if (!city) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return city;
    }

    async createCity(data: CreateCityDto): Promise<City> {
        return await cityModel.create(data);
    }

    async updateCity(id: string, data: UpdateCityDto): Promise<City> {
        const updatedCity = await cityModel.update(id, data);
        if (!updatedCity) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return updatedCity;
    }

    async deleteCity(id: string): Promise<{ message: string }> {
        const deleted = await cityModel.delete(id);
        if (!deleted) {
            throw { statusCode: 404, message: 'City not found' };
        }
        return { message: 'City deleted successfully' };
    }
}

export default new CityService();
