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

export interface IGetListParams {

}

export async function getOne(id: string): Promise<ICar | null> {
  if (!id) {
    throw new BaseError('BAD_PARAM', 400, true, ':id parameter required for getting car service')
  }
  const { data: results, status } = await axios.get(`${process.env.CAR_SERVICE_URL}/${id}`);
  if (status !== 200) {
    throw new APIError('Get Car by ID Failed');
  }

  return results;
}

export async function getList(params: IGetListParams): Promise<ICar[] | []> {


  // return [
  //   {
  //     id: 'TjhP242'
  //   }
  // ]
  return [];
}
