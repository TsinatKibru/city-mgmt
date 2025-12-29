"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.createCity = exports.getCity = exports.getCities = void 0;
const city_service_1 = __importDefault(require("../services/city.service"));
const getCities = async (req, res, next) => {
    try {
        const cities = await city_service_1.default.getAllCities();
        res.status(200).json({
            success: true,
            count: cities.length,
            data: cities,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getCities = getCities;
const getCity = async (req, res, next) => {
    try {
        const city = await city_service_1.default.getCityById(req.params.id);
        res.status(200).json({
            success: true,
            data: city,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getCity = getCity;
const createCity = async (req, res, next) => {
    try {
        const city = await city_service_1.default.createCity(req.body);
        res.status(201).json({
            success: true,
            data: city,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createCity = createCity;
const updateCity = async (req, res, next) => {
    try {
        const city = await city_service_1.default.updateCity(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: city,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateCity = updateCity;
const deleteCity = async (req, res, next) => {
    try {
        await city_service_1.default.deleteCity(req.params.id);
        res.status(200).json({
            success: true,
            message: 'City deleted successfully',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteCity = deleteCity;
