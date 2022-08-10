import { extractSqlError } from '../helpers/sql-helpers.js';

class PersonMaterialDAO {
  static async create(PersonMaterial, { personId, materialId, roleId }) {
    try {
      return await PersonMaterial.query().insert({
        personaId: personId,
        materialId,
        rolPersonaId: roleId,
      });
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA03';
      throw new Error(erroMsg);
    }
  }

  // TODO document this class and rename personRol

  static async searchPeopleByRol(
    PersonMaterial,
    { searchTerm, personRol = 'Autor' }
  ) {
    try {
      const people = await PersonMaterial.query()
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

export default PersonMaterialDAO;
