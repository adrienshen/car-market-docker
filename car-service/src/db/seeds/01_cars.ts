import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        {
            id: 'JHk290Xj',
            make: "Ford",
            model: 'F10',
            package: 'Base',
            color: 'Silver',
            year: 2010,
            category: 'Truck',
            mileage: 120123,
            price_cents: 1999900,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'fWI37la',
            make: "Toyota",
            model: 'Camry',
            package: 'SE',
            color: 'White',
            year: 2019,
            category: 'Sedan',
            mileage: 3999,
            price_cents: 2899000,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '1i3xjRllc',
            make: "Toyota",
            model: 'Rav4',
            package: 'XSE',
            color: 'Red',
            year: 2018,
            category: 'SUV',
            mileage: 24001,
            price_cents: 2275000,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'dku43920s',
            make: "Ford",
            model: 'Bronco',
            package: 'Badlands',
            color: 'Burnt Orange',
            year: 2022,
            category: 'SUV',
            mileage: 1,
            price_cents: 4499000,
            created_at: new Date(),
            updated_at: new Date(),
        }
    ]);
};
