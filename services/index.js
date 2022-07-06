// Archivo para tener importaciónes más limpias
const CityService = require('./city');
const CountryService = require('./country');
const FormatService = require('./format');
const MaterialService = require('./material');
const ProducerService = require('./producer');
const ProductionStateService = require('./production-state');
const PublisherService = require('./publisher');
const UnifiedSearchService = require('./unified-search');

module.exports = {
  CityService,
  CountryService,
  FormatService,
  MaterialService,
  ProducerService,
  ProductionStateService,
  PublisherService,
  UnifiedSearchService,
};
