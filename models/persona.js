const { Model } = require('objection');

class Persona extends Model {
  static get tableName(){
    return 'Persona';
  }
}

module.exports = Persona;
