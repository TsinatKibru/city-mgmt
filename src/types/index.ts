import { Request } from 'express';

export interface City {
    id: string;
    name: string;
    country: string;
    population: number;
    createdAt: string;
}

export type CreateCityDto = Omit<City, 'id' | 'createdAt'>;
export type UpdateCityDto = Partial<CreateCityDto>;

export interface User {
    id: string;
    email: string;
    role: 'admin' | 'user';
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
