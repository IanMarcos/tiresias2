import { Model, snakeCaseMappers } from 'objection';
import Category from './category.js';
import City from './city.js';
import MaterialCategory from './material-category.js';
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
      categorias: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: 'Material.id',
          through: {
            modelClass: MaterialCategory,
            from: 'CategoriasMaterial.material_id',
            to: 'CategoriasMaterial.categoria_id',
          },
          to: 'Categoria.id',
        },
      },
      ciudadPublicacion: {
        relation: Model.BelongsToOneRelation,
        modelClass: City,
        join: {
          from: 'Material.ciudad_publicacion_id',
          to: 'Ciudad.id',
        },
      },
      ciudadProduccion: {
        relation: Model.BelongsToOneRelation,
        modelClass: City,
        join: {
          from: 'Material.ciudad_produccion_id',
          to: 'Ciudad.id',
        },
      },
    };
  }
}

export default Material;
