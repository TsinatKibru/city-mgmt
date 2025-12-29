import { v4 as uuidv4 } from 'uuid';
import { City, CreateCityDto, UpdateCityDto } from '../types';

let cities: City[] = [
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
    async findAll(): Promise<City[]> {
        return cities;
    }

    async findById(id: string): Promise<City | null> {
        const city = cities.find((c) => c.id === id);
        return city || null;
    }

    async create(data: CreateCityDto): Promise<City> {
        const newCity: City = {
            id: uuidv4(),
            ...data,
            createdAt: new Date().toISOString(),
        };
        cities.push(newCity);
        return newCity;
    }

    async update(id: string, data: UpdateCityDto): Promise<City | null> {
        const index = cities.findIndex((c) => c.id === id);
        if (index === -1) return null;

        cities[index] = { ...cities[index], ...data };
        return cities[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = cities.findIndex((c) => c.id === id);
        if (index === -1) return false;

        cities.splice(index, 1);
        return true;
    }
}

export default new CityModel();
