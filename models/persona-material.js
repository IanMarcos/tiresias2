const { Model } = require('objection');

class PersonaMaterial extends Model {
  static get tableName() {
    return 'PersonaMaterial';
  }

  static get idColumn() {
    return ['persona_id', 'material_id'];
  }
}

module.exports = PersonaMaterial;
