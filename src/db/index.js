import { Model } from 'objection';
import knex from 'knex';
import knexConfig from './knexfile.js';

const configDB = () => {
  // Conecta Knex a la base de datos
  const db = knex(knexConfig);
  // Conecta los modelos de Objection.js a la configuración de Knex
  Model.knex(db);
};

export default configDB;
