import dotenv from 'dotenv';

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {
  client: 'mysql',
  connection: {
    host: process.env.TIRESIAS_DB_HOST,
    port: parseInt(process.env.TIRESIAS_DB_PORT, 10) || 3306,
    database: process.env.TIRESIAS_DB_NAME,
    user: process.env.TIRESIAS_DB_USER,
    password: process.env.TIRESIAS_DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
