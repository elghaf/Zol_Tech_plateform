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

