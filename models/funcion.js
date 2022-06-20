const { Model } = require('objection');

class Funcion extends Model {
  static get tableName(){
    return 'Funcion';
  }
}

module.exports = Funcion;
