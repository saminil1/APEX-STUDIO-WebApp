# igccert.org 웹 컨테이너 — Apache + PHP (WordPress / 일반 PHP 사이트 호환)
# Apple Silicon(arm64) / Intel(amd64) 모두 지원
ARG PHP_VERSION=8.2
FROM php:${PHP_VERSION}-apache

# PHP 확장 설치 (WordPress·그누보드·라라벨 등 일반 PHP CMS 요구사항)
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions \
 && install-php-extensions mysqli pdo_mysql gd zip intl exif opcache bcmath soap imagick

RUN a2enmod rewrite headers expires ssl \
 && a2dissite 000-default default-ssl

COPY apache/igccert.conf /etc/apache2/sites-available/igccert.conf
COPY php.ini /usr/local/etc/php/conf.d/zz-igccert.ini
COPY entrypoint.sh /usr/local/bin/igccert-entrypoint
RUN chmod +x /usr/local/bin/igccert-entrypoint && a2ensite igccert

ENTRYPOINT ["igccert-entrypoint"]
CMD ["apache2-foreground"]
