#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE TABLE IF NOT EXISTS app_table
  (
    id text NOT NULL,
    text text NOT NULL,
    status text NOT NULL
  )
EOSQL