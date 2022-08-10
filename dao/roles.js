import { extractSqlError } from '../helpers/sql-helpers.js';

class RolesDAO {
  // TODO document
  static async getRoleId(Model, role) {
    try {
      const [foundRole] = await Model.query().where('nombre', role);

      if (!foundRole) {
        throw new Error('Rol no encontrado/404');
      }

      return foundRole.id;
    } catch (error) {
      let errorMsg = extractSqlError(error) || 'EDA02';
      if (error.message.includes('404')) errorMsg = error.message;
      throw new Error(errorMsg);
    }
  }
}

export default RolesDAO;
