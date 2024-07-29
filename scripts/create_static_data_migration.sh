#!/usr/bin/env bash 
to_lower_case() {
    local input="$1"
    local lowercased
    lowercased=$(echo "$input" | tr '[:upper:]' '[:lower:]')
    echo "$lowercased"
}

# ---------------------------------------------------------------------------- #
set -eu

# setup env
export $(grep -v '^#' .env.local | xargs)

# user inputs
echo -n "Enter filename: "
read NEW_FILE_NAME
NEW_FILE_NAME="$(date +%Y%m%d%H%M%S)-$(to_lower_case $NEW_FILE_NAME)"

# create static file
TARG_DIR='./prisma/seeds'
echo -e "\nCreating new static data migration file...\n"
NEW_FILE_DIR="$TARG_DIR/$NEW_FILE_NAME.ts"
touch $NEW_FILE_DIR
echo -e "\nFile created in $NEW_FILE_DIR"

# add run command to migrate.sh
echo -e "\nAdding migration run command to ./scripts/migrate.sh\n"
echo -e "\nnpx tsx $NEW_FILE_DIR" >> "./scripts/migrate.sh"

# add boilerplate to static file 
echo -e "\nAdding boilerplate to $NEW_FILE_DIR\n"
cat <<EOF > $NEW_FILE_DIR
import { PrismaClient } from '@prisma/client';
import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
})

const prisma = new PrismaClient();

const main = async () => {}

main()
EOF

# done
echo -e "\nDone!\n"

