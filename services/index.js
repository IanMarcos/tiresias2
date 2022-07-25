// Archivo para tener importaciónes más limpias
const CityService = require('./city');
const CountryService = require('./country');
const FormatService = require('./format');
const LanguageService = require('./language');
const MaterialService = require('./material');
const PersonMaterialService = require('./person-material');
const ProducerService = require('./producer');
const ProductionStateService = require('./production-state');
const PublisherService = require('./publisher');
const UnifiedSearchService = require('./unified-search');

module.exports = {
  CityService,
  CountryService,
  FormatService,
  LanguageService,
  MaterialService,
  PersonMaterialService,
  ProducerService,
  ProductionStateService,
  PublisherService,
  UnifiedSearchService,
};
