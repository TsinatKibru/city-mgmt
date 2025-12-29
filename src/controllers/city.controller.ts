import { Request, Response, NextFunction } from 'express';
import cityService from '../services/city.service';

export const getCities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cities = await cityService.getAllCities();
        res.status(200).json({
            success: true,
            count: cities.length,
            data: cities,
        });
    } catch (err) {
        next(err);
    }
};

export const getCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = await cityService.getCityById(req.params.id);
        res.status(200).json({
            success: true,
            data: city,
        });
    } catch (err) {
        next(err);
    }
};

export const createCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = await cityService.createCity(req.body);
        res.status(201).json({
            success: true,
            data: city,
        });
    } catch (err) {
        next(err);
    }
};

export const updateCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = await cityService.updateCity(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: city,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await cityService.deleteCity(req.params.id);
        res.status(200).json({
            success: true,
            message: 'City deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};
