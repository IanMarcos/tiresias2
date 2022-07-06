const { Model, snakeCaseMappers } = require('objection');

class Ciudad extends Model {
  static get tableName() {
    return 'Ciudad';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = Ciudad;
