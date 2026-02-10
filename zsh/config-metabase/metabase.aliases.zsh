function start-postgres {
    zparseopts -D -E -F -A opts -name: -port: -dbname:

    local port=$opts[--port]
    local name=$opts[--name]
    local dbname=$opts[--dbname]
    echo "port: $port, name: $name"
    docker run -d --name ${name} \
        -e POSTGRES_DB=${dbname} \
        -e POSTGRES_USER=metabase \
        -e POSTGRES_PASSWORD=metabase \
        -p ${port}:5432 \
        postgres:latest
}

function stop-postgres() {
    zparseopts -D -E -F -A opts -name:

    local name=$opts[--name]
    echo "name: $name"
    docker stop ${name}
    docker rm ${name}
}

function reset-postgres-1() {
    docker stop metabase-postgres
    docker rm metabase-postgres
    start-postgres --name metabase-postgres --port 5432
}

function reset-postgres-2() {
    docker stop metabase-postgres-2
    docker rm metabase-postgres-2
    start-postgres --name metabase-postgres-2 --port 5433
}

function stop-postgres() {
    docker stop metabase-postgres
    docker rm metabase-postgres
}

function mb() {
    cd $HOME/work/metabase
}

function mb-fe-oss() {
    FS_CACHE=true yarn build-hot:js-wait
}

function mb-fe-ee() {
    FS_CACHE=true MB_EDITION=ee yarn build-hot:js-wait
}

function mb-fe-oss() {
    FS_CACHE=true MB_EDITION=oss yarn build-hot:js-wait
}

function mb-ee() {
    # mb-postgres-config
    export MB_EDITION='ee'
    export MB_PREMIUM_EMBEDDING_TOKEN=$MB_TOKEN
    export ENTERPRISE_TOKEN=$MB_TOKEN
    export MB_ENTERPRISE_TOKEN=$MB_TOKEN
    export CYPRESS_ALL_FEATURES_TOKEN=$MB_TOKEN
    export CYPRESS_NO_FEATURES_TOKEN='<another token>'
    # dev-start - starts repl
    clojure -M:dev:ee:ee-dev:dev-start
}

function mb-oss-empty() {
    # mb-postgres-config
    export MB_EDITION='oss'
    clojure -M:run:dev:oss
}

function mb-ee-empty() {
    # mb-postgres-config
    # export MB_EDITION='ee'
    # export MB_PREMIUM_EMBEDDING_TOKEN=
    # export ENTERPRISE_TOKEN=
    # export MB_ENTERPRISE_TOKEN=
    # export CYPRESS_ALL_FEATURES_TOKEN=
    # export CYPRESS_NO_FEATURES_TOKEN=
    # dev-start - starts repl
    clojure -M:dev:ee:ee-dev:dev-start
}

function mb-postgres-config() {
    export MB_DB_TYPE=postgres
    export MB_DB_DBNAME=metabase
    export MB_DB_PORT=5432
    export MB_DB_USER=metabase
    export MB_DB_PASS=metabase
    export MB_DB_HOST=localhost
}
