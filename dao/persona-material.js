const PersonaMaterial = require('../models/persona-material');

const searchPersonByRol = async ({searchTerm, personRol = "Autor"}) => {
  try {
    const people = await PersonaMaterial.query()
      .select('persona_id', 'Persona.apellido', 'Pedrsona.nombres')
      .join('Persona', 'Persona.id', 'PersonaMaterial.persona_id')
      .join('Funcion', 'Funcion.id', 'PersonaMaterial.funcion_id')
      .where( builder => {
        builder
          .where('Persona.apellido', 'like', `%${searchTerm}%`)
          .orWhere('Persona.nombres', 'like', `%${searchTerm}%`)
          .andWhere('Funcion.nombre', '=', `${personRol}`);
      })
      .groupBy('persona_id');

    return people;
    
  } catch (error) {
    return  {err: 'Error 50003'};
  }
}

module.exports = {
  searchPersonByRol
};
