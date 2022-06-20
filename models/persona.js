const { Model } = require('objection');

class Persona extends Model {
  static get tableName() {
    return 'Persona';
  }
  
  static get relationMappings() {
    const Material = require('./material');
    const PersonaMaterial = require('./persona-material');

    return {
      materiales: {
        relation: Model.ManyToManyRelation,
        modelClass: Material,
        join: {
          from: 'Persona.id',
          through: {
            modelClass: PersonaMaterial,
            from: 'PersonaMaterial.persona_id',
            to: 'PersonaMaterial.material_id',
            extra: {funcion: 'funcion_id'}
          },
          to: 'Material.id'
        }
      },
    };
  }
}
module.exports = Persona;
