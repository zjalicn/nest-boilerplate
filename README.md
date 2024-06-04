# NestJS Drizzle Boilerplate

- NestJS 10
- Postgres SQL
- Drizzle ORM

## Database

You can create a local postgres database and add the credentials to the .env file

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=username -e POSTGRES_DB=dbname -p 5432:5432 -d postgres
```

```bash
DATABASE_URL=postgres://username:password@localhost:5432/dbname
```

```bash
npx drizzle-kit studio
```

## License

Nest is [MIT licensed](LICENSE).
