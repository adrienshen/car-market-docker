# Application README.md

This project demo consists of `car-service`, `postgres-db`, and `client`

Look inside `docker-compose.yml` for more information on each component.

## Docker and Docker-Compose

The entire stack can be run using `docker-compose build`, the `docker-compose up`. The client-api will be accessible on port 8080, such as `GET: http://localhost:8080/api/v1/cars?make=Toyota&color=White`. The service will be available on port 3000, for example: `http://localhost:3000/v1/cars?mileage_lt=5000`.

If using postgres in docker, you might need to start the postgres container first with `docker-compose up db`, and create the database `car_db` if it doesn't get auto generated.

The `car-service` connects with `postgres` running in docker container. There are migrations and seeds which can be run in the respective directory. If using `docker-compose`, the database migration and seeds will be run automatically during the startup phase (hopefully).

`car-service` returns basic resource in json format in response to REST queries such as:

```json
// GET: http://localhost:3000/v1/cars?mileage_lt=5000

[
    {
        "id": "fWI37la",
        "make": "Toyota",
        "model": "Camry",
        "package": "SE",
        "color": "White",
        "year": 2019,
        "category": "Sedan",
        "mileage": 3999,
        "price_cents": 2899000,
        "created_at": "2021-06-20T18:58:46.170Z",
        "updated_at": "2021-06-20T18:58:46.170Z"
    },
    {
        "id": "dku43920s",
        "make": "Ford",
        "model": "Bronco",
        "package": "Badlands",
        "color": "Burnt Orange",
        "year": 2022,
        "category": "SUV",
        "mileage": 1,
        "price_cents": 4499000,
        "created_at": "2021-06-20T18:58:46.170Z",
        "updated_at": "2021-06-20T18:58:46.170Z"
    }
]
```

The `client` communicates with the `car-service` via the REST interface and does it's own formatting and returns the final JSON response to the end user:

```json
// GET: http://localhost:8080/api/v1/cars?make=Toyota&color=White
{
    "message": "There were 2 founded with your filters",
    "results": [
        {
            "id": "fWI37la",
            "make": "Toyota",
            "model": "Camry",
            "package": "SE",
            "color": "White",
            "year": 2019,
            "category": "Sedan",
            "mileage": 3999,
            "price_cents": 2899000,
            "created_at": "2021-06-20T18:58:46.170Z",
            "updated_at": "2021-06-20T18:58:46.170Z"
        }
    ]
}
```

## Available Client API

- GET: http://localhost:8080/api/v1/cars/:id
    - :id is an alphanumeric string
- GET: http://localhost:8080/api/v1/car
    - query params:
        - make: is an alphanumeric string
        - model: is an alphanumeric string
        - color: is an alphanumeric string
        - year: is a numeric
        - mileage_gt: is a numeric
        - mileage_lt: is a numeric
        - price_cents_lt: is a numeric
        - price_cents_gt: is a numeric

## Improvements

- More test coverage. I only tested some of the critical parts due to time constraints.
- Support more query params such as date range.
