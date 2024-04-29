#!/usr/bin/env bash 

set -eu

# allow early exit
handle_sigint() {
    echo "Script interrupted by Ctrl+C"
    exit 1
}

export $(grep -v '^#' .env.test | xargs)
echo "Database connection: $DATABASE_URL"

DIR="$(cd "$(dirname "$0")" && pwd)"

docker compose -f docker-compose.yml up test-db -d --build 

echo '🟡 - Waiting for database to be ready...'
$DIR/wait_for_it.sh "${DATABASE_URL}" -- echo '🟢 - Database ready!' 

yarn prisma migrate dev

# migrate users and static data 
$DIR/migrate.sh