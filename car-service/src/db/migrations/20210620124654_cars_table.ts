import * as Knex from "knex";
import { TABLES } from "../constants";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLES.Cars, (t) => {
        t.string('id').primary().notNullable();
        t.string('make').notNullable();
        t.string('model').notNullable();
        t.string('package').notNullable();
        t.string('color').notNullable();
        t.integer('year').notNullable();
        t.string('category').notNullable();
        t.integer('mileage').notNullable();
        t.integer('price_cents').notNullable();
        t.timestamp('created_at').notNullable();
        t.timestamp('updated_at').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(TABLES.Cars);
}
