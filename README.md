####
#create new php project from start 
# Check if Laravel is properly installed
php artisan --version

# If you need to install Laravel (if the above command fails)
composer create-project --prefer-dist laravel/laravel /tmp/laravel-tmp
cp -R /tmp/laravel-tmp/. .
rm -rf /tmp/laravel-tmp

# Configure environment
cp .env.example .env
php artisan key:generate

# Update database settings in .env
sed -i "s/DB_HOST=.*/DB_HOST=db/" .env
sed -i "s/DB_PORT=.*/DB_PORT=5432/" .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=learning_platform/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=postgres/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=secret/" .env
sed -i "s/DB_CONNECTION=.*/DB_CONNECTION=pgsql/" .env
sed -i "s/REDIS_HOST=.*/REDIS_HOST=redis/" .env

# Fix permissions
chown -R www-data:www-data .
chmod -R 755 storage bootstrap/cache

# Run migrations
php artisan migrate

# Clear caches
php artisan config:clear
php artisan cache:clear

# Restart the server (if needed)
# If you're running this in the bash terminal, you'll need to exit and restart the container
# Or you can use the artisan serve command in a separate terminal

### installation requirements

####


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