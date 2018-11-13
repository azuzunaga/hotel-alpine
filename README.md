# Hotel Alpine
## An Employee Directory Web Application

### Working on Hotel Alpine Locally

#### Linting
1. Run `npm install` in the main directory.

#### Running the app locally
1. Start the Prisma server:
  * If you have Docker and Prisma already installed:
    1. In the main directory, run `docker-compose up -d`.
    2. Run `prisma deploy`
  * If you don't have Docker or Prisma installed:
    1. Follow the directions here: https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/. The Docker Compose file is already created, so ignore steps where it is mentioned.
  *Note*: This configuration uses a PostgreSQL db.

1. In your terminal, `cd` into the frontend directory and run `npm install`. Do the same with the backend directory.

