# Budget v2

## Figma

[figma](https://www.figma.com/file/fCUCaKRes5cNjmAAd7dq7b/budget-v2?type=design&node-id=1%3A90&mode=design&t=rUTmK3ALBNcNVQaM-1)

## Getting Started

1. Run `yarn install`
2. Setup `.env.local` per `.env.local.example`
3. Run `yarn dev`
4. Run `yarn migrate:dev`
5. Run `yarn migrate:data`

To stop databases run `yarn docker:stop`

## To seed data to db

1. Run `yarn migrate:data:create`
2. Edit files (make sure to add a check if the data exists)
3. Add data
4. Run `yarn migrate:data`

## Users

For `local` environment need to run user migration from auth0db to local db

for `deployed` environment e.g. `tst` will need to have an auth0 post user registration action

[Read more about auth0 actions here](https://auth0.com/docs/customize/actions)

## Conventions

- `filenames` are `kebab-cased`
- `.sh` scripts are `snake_cased`

## Testing

- For integration tests setup `.env.test` (copy of `.env.local`) except change the connection URL to `test-db`
- Make sure to run `export NODE_ENV=test`[link](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order) to use the `.env.test` file
- add `--run` for non-watch mode
- test debugging
  - ` npx playwright test example.spec.ts:10 --project=chromium --debug`
  - [docs here](https://playwright.dev/docs/debug)

## Updating Schema

Run `yarn migrate:dev --name <insert name for file here>`

## Restore from deployed database

Using DBeaver, download the `public` schema tables.
In the localdb delete the `public` table with `DROP SCHEMA public CASCADE;`.
Then tools > restore backup > select the `.sql` file.

## Running production build

- Create a `.env.production`
- Run `yarn prod:up`
- If first time, may need to restore the database
  e.g. `docker exec -i prd-db psql -U prd -X prd < backup.sql`
