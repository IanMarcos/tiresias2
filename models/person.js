/* eslint-disable global-require */
const { Model } = require('objection');

class Person extends Model {
  static get tableName() {
    return 'Persona';
  }

  static get relationMappings() {
    const Material = require('./material');
    const PersonMaterial = require('./person-material');

    return {
      materiales: {
        relation: Model.ManyToManyRelation,
        modelClass: Material,
        join: {
          from: 'Persona.id',
          through: {
            modelClass: PersonMaterial,
            from: 'PersonaMaterial.persona_id',
            to: 'PersonaMaterial.material_id',
            extra: { funcion: 'funcion_id' },
          },
          to: 'Material.id',
        },
      },
    };
  }
}
module.exports = Person;
