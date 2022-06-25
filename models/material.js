const { Model } = require('objection');

class Material extends Model {
  static get tableName(){
    return 'Material';
  }

  static get relationMappings() {
    const Persona = require('./persona');
    const PersonaMaterial = require('./persona-material');

    return {
      personas: {
        relation: Model.ManyToManyRelation,
        modelClass: Persona,
        join: {
          from: 'Material.id',
          through: {
            modelClass: PersonaMaterial,
            from: 'PersonaMaterial.material_id',
            to: 'PersonaMaterial.persona_id',
            extra: {rol: 'rol_persona_id'}
          },
          to: 'Persona.id'
        }
      }
    };
  }
}

module.exports = Material;
