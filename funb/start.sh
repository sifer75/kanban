#! /bin/sh

until pg_isready -h postgres -U "$DB_USER" -d "$DB_DATABASE"; do
  echo 'En attente de la base de donnée ...'
  sleep 2
done

export PGPASSWORD=${DB_PASSWORD}

table_exists=$(psql "postgresql://${DB_USER}:${DB_PASSWORD}@postgres/${DB_DATABASE}" -t -c "
SELECT EXISTS (
  SELECT 1
  FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename = 'users'
)" | xargs)

if [ "$table_exists" = "f" ]; then
  echo 'Création des migrations ...'
  node ace make:migration users
  node ace make:migration workspaces
  node ace make:migration kanbans
  node ace make:migration tasks
  node ace make:migration missions
  node ace migration:run --force
  echo 'Les migrations sont appliquées.'
else
  echo 'Les migrations existent déjà.'
fi

npm start

