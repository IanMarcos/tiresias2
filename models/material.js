/* eslint-disable global-require */
const { Model, snakeCaseMappers } = require('objection');

class Material extends Model {
  static get tableName() {
    return 'Material';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    const Person = require('./person');
    const PersonMaterial = require('./person-material');

    return {
      personas: {
        relation: Model.ManyToManyRelation,
        modelClass: Person,
        join: {
          from: 'Material.id',
          through: {
            modelClass: PersonMaterial,
            from: 'PersonaMaterial.material_id',
            to: 'PersonaMaterial.persona_id',
            extra: { rol: 'rol_persona_id' },
          },
          to: 'Persona.id',
        },
      },
    };
  }
}

module.exports = Material;
