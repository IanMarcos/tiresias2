import { raw } from 'objection';
import { extractSqlError } from '../helpers/sql-helpers.js';

class UserDAO {
  /**
   * Creates a new user in the DB.
   * @param {Model} User - Instance of objection.js model for 'User'.
   * @param {Object} userData
   * @param {string} userData.userName - Log-in string.
   * @param {string} userData.password - User password.
   * @param {string} userData.name - Person's natural name.
   * @param {string} userData.roleId - Id of it's user role.
   */
  static async create(User, userData) {
    const { username, password, name, roleId } = userData;

    try {
      return await User.query().insert({
        nombreUsuario: username,
        contraseña: raw(
          `AES_ENCRYPT('${password}','${process.env.ENCRYPTION_KEY}')`
        ),
        nombre: name,
        rolUsuarioId: roleId,
      });
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA11';
      throw new Error(erroMsg);
    }
  }

  static async getAll(User) {
    try {
      return await User.query()
        .select(
          'Usuario.id',
          'Usuario.nombre',
          'Usuario.nombre_usuario',
          'RolUsuario.nombre AS rol'
        )
        .join('RolUsuario', 'Usuario.rol_usuario_id', 'RolUsuario.id')
        .where('eliminado', 0);
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA11';
      throw new Error(erroMsg);
    }
  }

  static async getById(User, id) {
    try {
      return await User.query()
        .select(
          'Usuario.id',
          'Usuario.nombre_usuario',
          'Usuario.nombre',
          'RolUsuario.nombre AS rol'
        )
        .join('RolUsuario', 'Usuario.rol_usuario_id', 'RolUsuario.id')
        .findById(id)
        .where('eliminado', 0);
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA11';
      throw new Error(erroMsg);
    }
  }

  static async getByUsername(User, username) {
    try {
      const [user] = await User.query()
        .select(
          'Usuario.id',
          'Usuario.nombre',
          'RolUsuario.nombre AS rol',
          raw(
            `AES_DECRYPT(contraseña, '${process.env.ENCRYPTION_KEY}') AS contraseña`
          )
        )
        .join('RolUsuario', 'Usuario.rol_usuario_id', 'RolUsuario.id')
        .where('nombre_usuario', username)
        .where('eliminado', 0);

      if (user) {
        user.contraseña = user.contraseña.toString();
      }
      return user;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA11';
      throw new Error(erroMsg);
    }
  }

  static async update(User, { id, name, password, roleId }) {
    const queryObject = {};
    if (name) queryObject.nombre = name;
    if (password) {
      queryObject.contraseña = raw(
        `AES_ENCRYPT('${password}','${process.env.ENCRYPTION_KEY}')`
      );
    }
    if (roleId) queryObject.rolUsuarioId = roleId;

    try {
      return await User.query().findById(id).patch(queryObject);
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA11';
      throw new Error(erroMsg);
    }
  }

  static async delete(User, id) {
    try {
      return await User.query().findById(id).patch({ eliminado: 1 });
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA11';
      throw new Error(erroMsg);
    }
  }
}

export default UserDAO;
