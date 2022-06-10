#/bin/sh
set -eu

node tools/start-dev-server.js &

npx nodemon \
    --watch assets \
    --watch content \
    --watch scripts \
    --watch styles \
    --watch templates \
    --ext '*' \
    --exec 'npm run build'
