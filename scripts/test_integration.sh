#!/usr/bin/bash env

DIR="$(cd "$(dirname "$0")" && pwd)"

source $DIR/setup_testdb.sh

vitest -c vitest.integration.config.ts