// Archivo para tener importaciónes más limpias
const CiudadDAO = require('./ciudad');
const EditorialDAO = require('./editorial');
const EstadoProduccionDAO = require('./estado-produccion');
const FormatoAccesibleDAO = require('./formato-accesible');
const MaterialDAO = require('./material');
const PaisDAO = require('./pais');
const PersonaMaterialDAO = require('./persona-material');
const ProductoraDAO = require('./productora');
const RolPersonaDAO = require('./rol-persona');

module.exports = {
  CiudadDAO,
  EditorialDAO,
  EstadoProduccionDAO,
  FormatoAccesibleDAO,
  MaterialDAO,
  PaisDAO,
  PersonaMaterialDAO,
  ProductoraDAO,
  RolPersonaDAO,
};
