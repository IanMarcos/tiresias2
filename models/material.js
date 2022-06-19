const { Model } = require('objection');

class Material extends Model {
  static get tableName(){
    return 'Material';
  }
}

module.exports = Material;
