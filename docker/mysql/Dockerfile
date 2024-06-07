FROM mysql:8.0.33

EXPOSE 3306

COPY docker/mysql/initdb.d/ /docker-entrypoint-initdb.d/
COPY docker/mysql/conf.d /etc/mysql/conf.d/