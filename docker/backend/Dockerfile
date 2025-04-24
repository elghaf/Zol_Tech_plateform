FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    libicu-dev \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    nodejs \
    npm \
    supervisor \
    cron \
    default-mysql-client \
    redis-tools \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    intl \
    zip \
    opcache \
    calendar \
    soap \
    sockets

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache modules
RUN a2enmod rewrite headers ssl

# Configure PHP
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 64M/g' "$PHP_INI_DIR/php.ini" \
    && sed -i 's/post_max_size = 8M/post_max_size = 64M/g' "$PHP_INI_DIR/php.ini" \
    && sed -i 's/memory_limit = 128M/memory_limit = 512M/g' "$PHP_INI_DIR/php.ini"

# Set working directory
WORKDIR /var/www/html

# Copy Apache configuration
COPY docker/backend/apache.conf /etc/apache2/sites-available/000-default.conf

# Copy application files
COPY ./server .

# Install dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Install Laravel Sanctum
RUN composer require laravel/sanctum

# Generate application key
RUN php artisan key:generate --force

# Run migrations and seeders
RUN php artisan migrate --force --seed

# Publish Sanctum configuration
RUN php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Cache configuration and routes
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Create supervisor config directory
RUN mkdir -p /etc/supervisor/conf.d

# Copy supervisor configuration
COPY docker/backend/supervisor.conf /etc/supervisor/conf.d/supervisor.conf

# Create cron job
RUN echo "* * * * * cd /var/www/html && php artisan schedule:run >> /dev/null 2>&1" | crontab -

EXPOSE 80

# Start Apache, cron, and supervisor
CMD service cron start && apache2-foreground
