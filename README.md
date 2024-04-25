# Budget v2

## Getting Started

1. Run `yarn install`
2. Run `yarn dev`
3. Run `yarn migrate:dev`
4. Run `yarn migrate:data`

To stop databases run `yarn docker:stop`

## To seed data to db

1. Run `yarn migrate:data:create`
2. Edit files (make sure to add a check if the data exists)
3. Add data
4. Run `yarn migrate:data`

## Conventions

- `filenames` are `kebab-cased`
- `.sh` scripts are `snake_cased`
