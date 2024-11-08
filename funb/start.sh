#! /bin/sh

if [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_DATABASE" ]; then
  echo "Les variables d'environnement DB_USER, DB_PASSWORD ou DB_DATABASE ne sont pas définies."
  exit 1
fi

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


echo "Valeur de table_exists: '$table_exists'"
echo "DB_USER=$DB_USER, DB_PASSWORD=$DB_PASSWORD"


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

