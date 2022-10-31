# Usof-Backend

## About

This is a forum platform (StackOverflow analogy) which can be used by developers to exchange their opinions on different issues they're facing.

## Requirements & dependencies

- Node.js (version 14.15.4 or higher)
- NPM (version 6.14.0 or higher)
- Redis
- MySQL
- Docker (_optional_, see below)

## Install & run

Prior to setup, create an `.env` file based on the `.env.example` file, and fill in the required vars.
Then proceed:

1. Via Docker:

- Enter the root directory of the repository.
- Ensure that you don't have mysql or redis running on your local machine.
- Run `docker compose up -d`.
- Optionally, to run seeders & migrations, run `docker compose run --rm api npm run migrate:up`

2. Locally

- Install all the required dependencies, listed above.
- Run `npm install` in the root directory of the repository.
- Optionally, to run seeders & migrations, run `npm run migrate:up`.
- Run `npm start`.

You can now access the API, using the host and port, provided in the `.env` file.

## Diagrams

Entity-Relationship Diagram

<img width="890" alt="Untitled 1 (4)" src="https://user-images.githubusercontent.com/71522782/198989042-fd4a0a34-887d-4526-ae57-f13ef970f136.png">

