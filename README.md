## Description

Project for the course "Clean Code" at the school ESGI in fourth year.

This is the backend for a leitner system, a flashcard system that uses spaced repetition to help you remember things.

The backend works with 2 services: a Postgres Database and a MinIO Object Storage.

## Installation

```bash
# dependencies
$ npm install

# build the project
$ npm run build
```

### Setup services

First, make your `.env` file : copy the `.env.example` file and rename it `.env`

```bash
# If developping locally, start the services
$ docker-compose up -d
```

```bash
# setup your database
$ npm run migrate:up
```

### For MINIO

If you are using MinIO, you will need to create a bucket called `leitner` and a bucket called `leitner-compressed` in
the MinIO web interface, accessible at `localhost:{OBJECT_STORAGE_PORT}` -> example `localhost:9000`, the port is
specified in the `.env` file.

## Running the app

```bash
# development
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

```bash
# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Use the Swagger

If necessary, you can use the Swagger by navigating to: `locahost:$PORT/api` -> example `localhost:3000/api`

## Support

We do not plan on offering support for this app;

YOU may however send us good vibes to survive exam season :)

## (do not) Stay in touch ❤️

- [lyeslimani](https://github.com/lyeslimani) Lyès Slimani
- [flammefolie](https://github.com/flammefolie) Fanny Guillemont
- [maramzitouni](https://github.com/maramzitouni) Maram Zitouni
