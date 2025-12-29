
const cityService = require('../services/city.service');

exports.getCities = async (req, res, next) => {
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

exports.getCity = async (req, res, next) => {
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

exports.createCity = async (req, res, next) => {
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

exports.updateCity = async (req, res, next) => {
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

exports.deleteCity = async (req, res, next) => {
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
