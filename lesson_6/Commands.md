# Команды из последнего видео урока №6

## Поднимаем Postgres

```shell
docker run --rm -d \
  --name database \
  --net=back_net \
  -e POSTGRES_USER=docker_app \
  -e POSTGRES_PASSWORD=docker_app \
  -e POSTGRES_DB=docker_app_db \
  postgres:14
```

## Создаем таблицу Postgres

```shell
docker exec -it database psql --username docker_app --dbname docker_app_db
```

Внутри контейнера с постгрес создаем таблицу:

```postgresql
CREATE TABLE app_table
(
    id     text NOT NULL,
    text   text NOT NULL,
    status text NOT NULL
);
```

## Поднимаем бекенд

```shell
docker run --rm -d \
  --name backend \
  --net=back_net \
  -p 8000:8000 \
  -e HOST=database \
  6_back
```

## Делаем запросы к бекенду

```shell
curl -X PUT localhost:8000/api -H 'Content-Type: application/json' -d '{"text":"Buy cheese","status":"active"}'
curl localhost:8000/api
```
