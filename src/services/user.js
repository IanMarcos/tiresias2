import { User, UserRole } from '../models/index.js';
import { UserDAO, RolesDAO } from '../dao/index.js';
import { generateJWT } from '../helpers/jwt.js';
import { isDefined } from '../helpers/utils.js';
import logger from '../helpers/loggers.js';

class UsersService {
  #modelInstance;

  constructor(userInstance = User) {
    this.#modelInstance = userInstance;
  }

  async getUsers(limit, page) {
    try {
      return await UserDAO.getAll(this.#modelInstance, { limit, page });
    } catch (error) {
      return { err: error.message };
    }
  }

  async getUserById(id) {
    try {
      const user = await UserDAO.getById(this.#modelInstance, id);
      if (!user) {
        return { err: 'Usuario no existe/404' };
      }

      const { contrasenia, rolUsuarioId, eliminado, ...cleanUser } = user;
      return cleanUser;
    } catch (error) {
      return { err: error.message };
    }
  }

  async createUser(request) {
    const { role } = request;
    const userData = { ...request };

    try {
      userData.roleId = await RolesDAO.getRoleId(UserRole, role);
      const newUser = await UserDAO.create(this.#modelInstance, userData);
      logger.info(`Nuevo usuario creado con id: ${newUser.id}, y data: ${userData}`);
      return { uid: newUser.id };
    } catch (error) {
      return { err: error.message };
    }
  }

  async authenticateUser({ username, password }) {
    try {
      const foundUser = await UserDAO.getByUsername(
        this.#modelInstance,
        username
      );
      if (!foundUser) {
        return { err: 'Usuario no existe/404' };
      }

      if (foundUser.contrasenia !== password) {
        return { err: 'Usuario o contrasenia invalido/401' };
      }

      const token = generateJWT({
        uid: foundUser.id,
        name: foundUser.nombre,
        role: foundUser.rol,
      });

      return { token };
    } catch (error) {
      return { err: error.message };
    }
  }

  async updateUser(data) {
    const userData = { ...data };
    try {
      if (isDefined(data.role)) {
        userData.roleId = await RolesDAO.getRoleId(UserRole, data.role);
        delete userData.role;
      }

      const result = await UserDAO.update(this.#modelInstance, userData);
      if (result === 0) return { err: 'Usuario no encontrado/404' };
      logger.info(`Actualizado usuario con data: ${userData}`);
      return {};
    } catch (error) {
      return { err: error.message };
    }
  }

  async deleteUser(id) {
    try {
      const result = await UserDAO.delete(this.#modelInstance, id);

      if (result === 0) return { err: 'Usuario no encontrado/404' };
      logger.info(`Eliminado usuario con id: ${id}`);
      return {};
    } catch (error) {
      return { err: error.message };
    }
  }
}

export default UsersService;
