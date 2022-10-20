#!/bin/bash
set -e

SERVER="wcbet-server";
PW="wcbetpwd!";
DB="wcbet";
PGUSER="wcbetuser";
PGPASSWORD="wcbetpass";
PGADMIN="pgadmin4";
PGADMIN_DEFAULT_EMAIL="pgadmin4@pgadmin.org";
PGADMIN_DEFAULT_PASSWORD="admin";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGUSER=$PGUSER \
  -e PGPASSWORD=$PGPASSWORD \
  -p 55000:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres

# create pgadmin
echo "stop and remove old docker [$PGADMIN] and starting a new fresh instance of [$PGADMIN]"
(docker kill $PGADMIN || :) && \
  (docker rm $PGADMIN || :) && \
  docker run -p 5050:80 \
  -e PGADMIN_DEFAULT_EMAIL=$PGADMIN_DEFAULT_EMAIL \
  -e PGADMIN_DEFAULT_PASSWORD=$PGADMIN_DEFAULT_PASSWORD \
  -d --name $PGADMIN dpage/$PGADMIN