function start-postgres() {
    docker run -d --name metabase-postgres -e \
        POSTGRES_DB=metabase \
        POSTGRES_USER=metabase \
        POSTGRES_PASSWORD=metabase \
        -p 5432:5432 \
        postgres:latest
}

function stop-postgres() {
    docker stop metabase-postgres
    docker rm metabase-postgres
}

function mb() {
    cd $HOME/work/metabase
}

function mb-fe-oss() {
    mb && FS_CACHE=true yarn build-hot:js-wait
}

function mb-fe-ee() {
    mb && FS_CACHE=true MB_EDITION=ee yarn build-hot:js-wait
}

function mb-ee() {
    mb-postgres-config
    export MB_EDITION='ee'
    export MB_PREMIUM_EMBEDDING_TOKEN=$MB_TOKEN
    export ENTERPRISE_TOKEN=$MB_TOKEN
    export MB_ENTERPRISE_TOKEN=$MB_TOKEN
    export CYPRESS_ALL_FEATURES_TOKEN=$MB_TOKEN
    export CYPRESS_NO_FEATURES_TOKEN='<another token>'
    clojure -M:run:dev:ee
}

function mb-ee-empty() {
    mb-postgres-config
    export MB_EDITION='ee'
    clojure -M:run:dev:ee
}

function mb-postgres-config() {
    export MB_DB_TYPE=postgres
    export MB_DB_DBNAME=metabase
    export MB_DB_PORT=5432
    export MB_DB_USER=postgres
    export MB_DB_PASS=example_password
    export MB_DB_HOST=localhost
}
