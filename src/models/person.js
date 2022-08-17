import { Model } from 'objection';
import Material from './material.js';
import PersonMaterial from './person-material.js';

class Person extends Model {
  static get tableName() {
    return 'Persona';
  }

  static get relationMappings() {
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
export default Person;
