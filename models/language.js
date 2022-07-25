const { Model } = require('objection');

class Language extends Model {
  static get tableName() {
    return 'Idioma';
  }
}

module.exports = Language;
