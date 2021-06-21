import { NextFunction, Request, Response } from "express";
import { param, query, validationResult } from "express-validator";
import { APIError } from "../errors";
import { getFormattedSentence } from "../helpers";

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
        formatted: getFormattedSentence(car),
        original: car,
      });
    } catch (err) {
      console.log('GOT ERROR HERE!', err);
      next(err);
    }
  });

router.get('/cars',
  [
    query('make').optional().isAlphanumeric(),
    query('model').optional().isAlphanumeric(),
    query('color').optional().isAlpha(),
    query('package').optional().isAlpha(),
    query('mileage_gt').optional().isNumeric(),
    query('mileage_lt').optional().isNumeric(),
    query('price_gt').optional().isNumeric(),
    query('price_lt').optional().isNumeric(),
  ],
  validateParams,
  async (req: Request, res: Response) => {

    console.log('Got Params: ', req.params);

    res.json([]);

  });

export default router;
