# Client API README.md

## Environment Variables

The only required environmental variable used for the client app is `CAR_SERVICE_URL` which points to the car-service running on docker.

```bash
# example .env file
CAR_SERVICE_URL='http://localhost:3000/v1/cars'
PORT=8080
```

## Development

1. `npm install`
2. `npm run dev`, make sure `nodemon` is install globally

## Tests

Run jest supertest with `npm run test` or `jest`

Tests are placed adjacent to files being tested for ease of access. For example: `helpers.test.ts` is for testing `helpers.ts`.
