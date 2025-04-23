FROM php:8.2-apache

WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    curl \
    libpq-dev \
    git \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Apache configuration
COPY docker/backend/apache.conf /etc/apache2/sites-available/000-default.conf

# Copy composer files first
COPY ./server/composer.json ./server/composer.lock* ./

# Install dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Copy remaining application files
COPY ./server .

# Create public directory if it doesn't exist
RUN mkdir -p public

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/public

EXPOSE 80

CMD ["apache2-foreground"]
