import { TABLES } from '../db/constants';
import knex from '../db';

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

export interface IFilters {
    make?: string;
    model?: string;
    color?: string;
    category?: string;
    year?: number;
    mileage_gt?: number;
    mileage_lt?: number;
    price_gt?: number;
    price_lt?: number;
}

const MAX_PRICE_CENTS = 10e8; // 10,000,000.00
const MAX_MILES = 10e5; // 1,000,000

// these are really queries helpers
export function getOne(id: string) {
    const query = knex(TABLES.Cars)
        .select()
        .where('id', id)
        .first();
    return query;
}

export function list(filters: IFilters) {
    let query = knex(TABLES.Cars)
        .select()

    if (filters.category) {
        query = query.where('category', filters.category);
    }
    if (filters.color) {
        query = query.where('color', filters.color);
    }
    if (filters.make) {
        query = query.where('make', filters.make);
    }
    if (filters.model) {
        query = query.where('model', filters.model);
    }
    if (filters.year) {
        query = query.where('year', filters.year);
    }
    if (filters.mileage_gt || filters.mileage_lt) {
        query = query.whereBetween('mileage', [filters.mileage_gt || 0, filters.mileage_lt || MAX_MILES])
    }
    if (filters.price_gt || filters.price_lt) {
        query = query.whereBetween('price_cents', [filters.price_gt || 0, filters.price_lt || MAX_PRICE_CENTS])
    }

    return query.orderBy('created_at', 'desc');
}
