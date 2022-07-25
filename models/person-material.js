const { Model, snakeCaseMappers } = require('objection');

class PersonMaterial extends Model {
  static get tableName() {
    return 'PersonaMaterial';
  }

  static get idColumn() {
    return ['persona_id', 'material_id', 'rol_persona_id'];
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = PersonMaterial;
