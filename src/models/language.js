import { Model } from 'objection';

class Language extends Model {
  static get tableName() {
    return 'Idioma';
  }
}

export default Language;
