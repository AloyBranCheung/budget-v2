#!/usr/bin/env bash 

set -eu


npx tsx ./prisma/seeds/20240424105830-add-home-icon.ts

npx tsx ./prisma/seeds/20240424185825-add-icons.ts

npx tsx ./prisma/seeds/20240425225318-add-static-categories.ts
