FROM nginx:latest

COPY ./josecarlosme-blog/public/ /var/www/
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf