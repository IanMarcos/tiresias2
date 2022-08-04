import { Model, snakeCaseMappers } from 'objection';
import Person from './person.js';
import PersonMaterial from './person-material.js';

class Material extends Model {
  static get tableName() {
    return 'Material';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
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

export default Material;
