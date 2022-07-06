/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: 'mysql',
  connection: {
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
