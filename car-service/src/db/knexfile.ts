const path = require('path');

const BASE_PATH = path.join(__dirname);

const migrations = {
    directory: path.join(BASE_PATH, 'migrations'),
}
const seeds = {
    directory: path.join(BASE_PATH, 'seeds'),
}

export default {
    test: {
        client: 'pg',
        connection: process.env.POSTGRES_TEST_DB_STRING,
        migrations,
        seeds,
    },
    development: {
        client: 'pg',
        connection: process.env.POSTGRES_DEV_DB_STRING,
        migrations,
        seeds,
    },
    staging: {
        client: 'pg',
        connection: process.env.POSTGRES_DEV_DB_STRING,
        migrations,
        seeds,
        pool: {
            min: 0,
            max: 8
        }
    }
}
