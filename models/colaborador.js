const { Model } = require('objection');

class Colaborador extends Model {
  static get tableName(){
    return 'Colaborador';
  }
}

module.exports = Colaborador;
