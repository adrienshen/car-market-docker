# README

## Environment Variables

```bash
# example .env file
POSTGRES_TEST_DB_STRING='postgres://postgres:password@localhost:5432/car_db_test'
POSTGRES_DEV_DB_STRING='postgres://postgres:password@localhost:5432/car_db'
```

## Prepare Database

Prepare the database by running `knex migrate:latest`, and `knex seed:run` while postgres docker container or local postgres is running.

## Docker

There is a docker-compose file in the root dir above this which can be run with `docker-compose up`. It will run the postgres database, car-service, and web-client in containers and expose the web-client on port 8080.

## Test

Run jest supertest with `npm run test` or `jest`

Tests are placed adjacent to files. In this project, we use supertest w. jest to integration test and snapshot the routes as there's not many individual pure logic functions that can be unit tested easily without mocking everything.
