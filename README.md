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
- Make sure to run `export NODE_ENV=test`[link](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order)
- add `--run` for non-watch mode
