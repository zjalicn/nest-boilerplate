FROM postgres:14

ENV POSTGRES_USER=username
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=dbname

EXPOSE 5432