FROM php:8.1-fpm as php_stage

# Installing dependencies for the PHP modules
RUN apt-get update && \
    apt-get install -y zip curl libcurl3-dev libzip-dev libpng-dev libonig-dev libxml2-dev && \
    rm -rf /var/lib/apt/lists/*

# Installing additional PHP modules
RUN docker-php-ext-install curl gd mbstring mysqli pdo pdo_mysql xml

# Install and configure ImageMagick
RUN apt-get update && \
    apt-get install -y libmagickwand-dev && \
    pecl install imagick && \
    docker-php-ext-enable imagick && \
    apt-get purge -y libmagickwand-dev && \
    rm -rf /var/lib/apt/lists/*

# Install Composer so it's available
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Expose the port your PHP application will run on
EXPOSE 9000
