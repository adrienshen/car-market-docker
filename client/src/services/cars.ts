/**
 * The car service gets cars from the actual micro-service being served on another port or machine, the endpoint is provided by process.env.CAR_SERVICE_URL
 */

import axios from "axios"
import { APIError } from "../errors";
import { BaseError } from "../errors/BaseError"
import logger from "../logger";

logger.info(`CAR_SERVICE_URL=${process.env.CAR_SERVICE_URL || 'NEEDS TO BE SET!!!'}`)

export interface ICar {
  id: string;
  make: string;
  model: string;
  package: string;
  color: string;
  year: number;
  category: string;
  mileage: number;
  price_cents: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceResponseError {
  error: 'no results found'
}

export interface IGetListQuery {
  make: string;
  model: string;
  package: string;
  color: string;
  year: number;
  mileage_gt: number;
  mileage_lt: number;
  price_cents_gt: number;
  price_cents_lt: number;
}

export async function getOne(id: string): Promise<ICar | null> {
  if (!id) {
    throw new BaseError('BAD_PARAM', 400, true, ':id parameter required for getting car service')
  }
  const { data: results, status } = await axios.get(`${process.env.CAR_SERVICE_URL}/${id}`);
  if (status !== 200) {
    throw new APIError('Get car by id failed');
  }

  return results;
}

export async function getList(query: IGetListQuery): Promise<ICar[] | []> {
  logger.info('Car Query: ', query);
  const { data: results, status } = await axios.get(`${process.env.CAR_SERVICE_URL}`, { params: query })
  if (status !== 200) {
    throw new APIError(`Get cars failed, query=${JSON.stringify(query)}`);
  }

  return results;
}
