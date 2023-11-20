# Dockerfile for PHP-FPM
FROM php:8.3-rc-fpm

# Install required extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

CMD ["php-fpm"]