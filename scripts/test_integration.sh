#!/usr/bin/bash env

# allow early exit
handle_sigint() {
    echo "Script interrupted by Ctrl+C"
    exit 1
}


DIR="$(cd "$(dirname "$0")" && pwd)"

source $DIR/setup_testdb.sh

vitest -c vitest.integration.config.ts --run

yarn dc:stop test-db