import { User, UserRole } from '../models/index.js';
import { UserDAO, RolesDAO } from '../dao/index.js';
import { generateJWT } from '../helpers/jwt.js';

class UsersService {
  #modelInstance;

  constructor(userInstance = User) {
    this.#modelInstance = userInstance;
  }

  async getUsers() {
    try {
      return await UserDAO.getAll(this.#modelInstance);
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

      const {
        contraseña,
        rolUsuarioId,
        eliminado,
        ...cleanUser
      } = user;
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
      return newUser.id;
    } catch (error) {
      return { err: error.message };
    }
  }

  async authenticateUser({ username, password }) {
    try {
      const foundUser = await UserDAO.getByUsername(this.#modelInstance, username);
      if (!foundUser) {
        return { err: 'Usuario no existe/404' };
      }

      if (foundUser.contraseña !== password) {
        return { err: 'Usuario o contraseña invalido/401' };
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
    try {
      const isValidId = await this.isActiveUser(data.id);
      if (!isValidId) return { err: 'Usuario no encontrado/404' };

      const result = await UserDAO.update(this.#modelInstance, data);
      if (result === 0) return { err: 'No se pudo actualizar' };
      return {};
    } catch (error) {
      return { err: error.message };
    }
  }

  async deleteUser(id) {
    try {
      const isValidId = await this.isActiveUser(id);
      if (!isValidId) return { err: 'Usuario no encontrado/404' };

      const result = await UserDAO.delete(this.#modelInstance, id);

      if (result === 0) return { err: 'Usuario no encontrado/404' };
      return {};
    } catch (error) {
      return { err: error.message };
    }
  }

  async userIsAdmin(id) {
    try {
      const user = await UserDAO.getById(this.#modelInstance, id);

      if (!user || user.rol !== 'Administrador') return false;
      return true;
    } catch (error) {
      return { err: error.message };
    }
  }

  async isActiveUser(id) {
    try {
      const user = await UserDAO.getById(this.#modelInstance, id);
      if (!user) return false;
      return true;
    } catch (error) {
      return { err: error.message };
    }
  }
}

export default UsersService;
