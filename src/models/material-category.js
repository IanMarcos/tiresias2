import { Model, snakeCaseMappers } from 'objection';

class MaterialCategory extends Model {
  static get tableName() {
    return 'CategoriasMaterial';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

export default MaterialCategory;
