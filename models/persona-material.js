const { Model, snakeCaseMappers } = require('objection');

class PersonaMaterial extends Model {
  static get tableName() {
    return 'PersonaMaterial';
  }

  static get idColumn() {
    return ['persona_id', 'material_id'];
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = PersonaMaterial;
