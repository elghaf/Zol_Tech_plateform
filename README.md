### installation requirements


# Stop the backend service
docker compose stop backend

# Rebuild the backend service
docker compose build backend

# Start the backend service in detached mode
docker compose up -d backend

# Install Composer dependencies in the backend container
docker compose exec backend composer install

# Run PHPUnit tests in the backend container
docker compose exec backend ./vendor/bin/phpunit



# remove the volume (files all the cash on it)
docker compose rm -s -v backend


docker compose build backend
docker compose up -d backend





#######
# Access the backend container
docker compose exec backend bash

# Install postgresql-client
apt-get update && apt-get install -y postgresql-client

# Try to connect to the database
psql -h db -U postgres -d learning_platform

# When prompted for password, enter: secret

#######

# Access the backend container
docker compose exec backend bash

# Install postgresql-client
apt-get update && apt-get install -y postgresql-client

# Try to connect to the database
psql -h db -U postgres -d learning_platform

# When prompted for password, enter: secret