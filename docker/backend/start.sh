#!/bin/bash

# Check if Laravel is installed (artisan file exists)
if [ ! -f "/var/www/html/artisan" ]; then
    echo "Laravel not found. Installing new Laravel project..."
    cd /tmp
    composer create-project --prefer-dist laravel/laravel laravel-tmp
    cp -R laravel-tmp/. /var/www/html/
    rm -rf laravel-tmp
    cd /var/www/html
    
    # Set up environment
    cp .env.example .env
    php artisan key:generate
    
    echo "Laravel installed successfully!"
else
    echo "Laravel already installed."
fi

# Start the Laravel server
php artisan serve --host=0.0.0.0 --port=8000 