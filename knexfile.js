import { envs } from '#core/config/envs.js';

const connection = {
  host: envs.DB_HOST,
  user: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  port: envs.DB_PORT,
};

const schema = envs.DB_SCHEMA;

const setSchema = (conn, done) => {
  conn.query('SET timezone="UTC";', (err) => {
    if (err) return done(err);
    conn.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`, (err) => {
      if (err) return done(err);
      conn.query(`SET search_path TO ${schema};`, done);
    });
  });
};

export const development = {
  client: 'pg',
  connection,
  searchPath: [schema],
  migrations: {
    tableName: 'knex_migrations',
    schemaName: schema,
    directory: [
      './src/features/employees/migrations',
      './src/features/requests/migrations',
      './src/features/users/migrations',
    ],
  },
  seeds: {
    directory: [
      './src/features/employees/seed',
      './src/features/requests/seed',
      './src/features/users/seed',
    ],
  },
  pool: {
    min: 0,
    max: 1,
    idleTimeoutMillis: 10000,
    afterCreate: setSchema,
  },
};

export const production = {
  client: 'pg',
  connection,
  searchPath: [schema],
  migrations: {
    tableName: 'knex_migrations',
    schemaName: schema,
    directory: [
      './src/features/employees/migrations',
      './src/features/requests/migrations',
      './src/features/users/migrations',
    ],
  },
  seeds: {
    directory: [
      './src/features/employees/seed',
      './src/features/requests/seed',
      './src/features/users/seed',
    ],
  },
  pool: {
    min: 0,
    max: 1,
    idleTimeoutMillis: 10000,
    afterCreate: setSchema,
  },
};

export default { development, production };
