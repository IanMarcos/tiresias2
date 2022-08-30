import { extractSqlError } from '../helpers/sql-helpers.js';

class PersonMaterialDAO {
  /**
   * Creates a new record in the PersonaMaterial table and returns it.
   * @param {Model} PersonMaterial - Instance of an objection.js model.
   * @param {Object} args - Arguments to perform the queries.
   * @param {string} args.personId
   * @param {string} args.materialId
   * @param {string} args.roleId - Person's role's id.
   */
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

  /**
   * Creates a new record in the PersonaMaterial table and returns it.
   * @param {Model} PersonMaterial - Instance of an objection.js model.
   * @param {Object} args - Arguments to perform the queries.
   * @param {string} args.searchTerm - Search query to be used on a person names and last name.
   * @param {string} [args.personRol] - Role name. Defaults to 'Autor'.
   */
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
