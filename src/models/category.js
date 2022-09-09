import { Model } from 'objection';

class Category extends Model {
  static get tableName() {
    return 'Categoria';
  }
}

export default Category;
