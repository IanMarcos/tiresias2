const knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
//import MODEL from Objection

const configDB = () => {
  // Conecta Knex a la base de datos
  const db = knex(knexConfig);
  // Conecta los modelos de Objection.js a la configuración de Knex
  Model.knex(db);
}

module.exports = configDB;
