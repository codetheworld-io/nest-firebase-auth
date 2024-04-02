# Nest-Firebase-Auth

## Pre-require

- Nodejs 18.x

- Firebase certificates
  - `./certificates/firebase-client-config.json` ([Firebase Web App](https://firebase.google.com/docs/web/setup?hl=en&authuser=0))
  - `./certificates/firebase-service-account-key.json` ([Firebase Service Account](https://firebase.google.com/docs/admin/setup?hl=en&authuser=0))

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

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
