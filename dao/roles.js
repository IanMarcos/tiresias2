import { extractSqlError } from '../helpers/sql-helpers.js';

class RolesDAO {
  /**
   * Finds a role within the provided model and returns its Id.
   * @param {Model} Model - Instance of objection.js model for either RolUsuario or RolPersona.
   * @param {string} role - Role name.
   */
  static async getRoleId(Model, role) {
    try {
      const [foundRole] = await Model.query().where('nombre', role);

      if (!foundRole) {
        throw new Error('Rol no existe/400');
      }

      return foundRole.id;
    } catch (error) {
      let errorMsg = extractSqlError(error) || 'EDA02';
      if (error.message.includes('400')) errorMsg = error.message;
      throw new Error(errorMsg);
    }
  }
}

export default RolesDAO;
