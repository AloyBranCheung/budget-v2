#!/usr/bin/bash env

set -eu

# allow early exit
handle_sigint() {
    echo "Script interrupted by Ctrl+C"
    exit 1
}

DIR="$(cd "$(dirname "$0")" && pwd)"

source $DIR/setup_testdb.sh

npx playwright test