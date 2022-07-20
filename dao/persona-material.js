const { extractSqlError } = require('../helpers/sql-helpers');

class PersonaMaterialDAO {
  static async create(PersonaMaterial, { personId, materialId, roleId }) {
    try {
      return await PersonaMaterial.query()
        .insert({ personaId: personId, materialId, rolPersonaId: roleId });
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA03';
      throw new Error(erroMsg);
    }
  }

  static async searchPeopleByRol(PersonaMaterial, { searchTerm, personRol = 'Autor' }) {
    try {
      const people = await PersonaMaterial.query()
        .select('persona_id', 'Persona.apellido', 'Persona.nombres')
        .join('Persona', 'Persona.id', 'PersonaMaterial.persona_id')
        .join('RolPersona', 'RolPersona.id', 'PersonaMaterial.rol_persona_id')
        .where((builder) => {
          builder
            .where('Persona.apellido', 'like', `%${searchTerm}%`)
            .orWhere('Persona.nombres', 'like', `%${searchTerm}%`)
            .andWhere('RolPersona.nombre', '=', `${personRol}`);
        })
        .groupBy('persona_id');

      return people;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA03';
      throw new Error(erroMsg);
    }
  }
}

module.exports = PersonaMaterialDAO;
