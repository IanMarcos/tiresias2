const { Model, snakeCaseMappers } = require('objection');

class City extends Model {
  static get tableName() {
    return 'Ciudad';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = City;
