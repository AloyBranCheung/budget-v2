#!/usr/bin/env bash 

set -eu

# allow early exit
handle_sigint() {
    echo "Script interrupted by Ctrl+C"
    exit 1
}

if [[ $LOCAL_ENV == true ]]
then
    echo "Local environment detected"
    echo "Grabbing Auth0 Management API token"
    
    response=$(curl --request POST \
     --url $AUTH0_ISSUER_BASE_URL/oauth/token \
     --header 'content-type: application/json' \
     --data "{\"client_id\":\"$AUTH0_MANAGEMENT_API_CLIENT_ID\",\"client_secret\":\"$AUTH0_MANAGEMENT_API_CLIENT_SECRET\",\"audience\":\"https://dev-uw0vq8v32kjv4k1a.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")

    token=$(echo $response | jq -r '.access_token')

    export AUTH0_TMP_API_TOKEN=$token

    echo "Migrating users from auth0 db to local db"
    npx tsx ./prisma/seeds/migrate-users.ts
fi


npx tsx ./prisma/seeds/20240424105830-add-home-icon.ts

npx tsx ./prisma/seeds/20240424185825-add-icons.ts

npx tsx ./prisma/seeds/20240425225318-add-static-categories.ts

npx tsx ./prisma/seeds/20240426082801-add-close-icon.ts
