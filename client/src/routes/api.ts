import * as _ from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { param, query, validationResult } from 'express-validator';
import { APIError } from '../errors';
import { getFormattedSentence, getMultipleCarsFormattedSentence } from '../helpers';
import ErrorHandler from '../errors/handler';

const express = require('express');
const router = express.Router();

import * as CarService from '../services/cars';

function validateParams(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

router.get('/cars/:id',
  [
    param('id').isAlphanumeric(),
  ],
  validateParams,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car: CarService.ICar = await CarService.getOne(req.params.id);
      if (!car || !car.id) {
        throw new APIError('Invalid Response from Car-Service');
      }
      res.json({
        message: getFormattedSentence(car),
        car,
      });
    } catch (err) {
      next(err);
    }
  });

router.get('/cars',
  [
    query('make').optional().isAlphanumeric(),
    query('model').optional().isAlphanumeric(),
    query('color').optional().isAlpha(),
    query('package').optional().isAlpha(),
    query('year').optional().isNumeric(),
    query('mileage_gt').optional().isNumeric(),
    query('mileage_lt').optional().isNumeric(),
    query('price_cents_gt').optional().isNumeric(),
    query('price_cents_lt').optional().isNumeric(),
  ],
  validateParams,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const acceptedQueries = ['make', 'model', 'color', 'package', 'year', 'mileage_gt', 'mileage_lt', 'price_cents_gt', 'price_cents_lt'];
      const query: CarService.IGetListQuery = _.pick(req.query, acceptedQueries);
      console.log('Got Params: ', query);
  
      const cars: CarService.ICar[] | [] = await CarService.getList(query);
  
      res.json({
        message: getMultipleCarsFormattedSentence(cars.length),
        results: cars,
      });
    } catch (err) {
      next(err);
    }
  });

router.use(
  async (err, req: Request, res: Response, next: NextFunction) => {
    if (!ErrorHandler.isTrustedError(err)) {
      next(err);
    }
    await ErrorHandler.handleError(err);
    console.log('error: ', err)
    if (!err.httpCode) return next(err);
    // if error is expected and operation, then return the error code to client
    res.status(err.httpCode).send(err.name);
  }
);  

export default router;
