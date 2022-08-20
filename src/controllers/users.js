import UsersService from '../services/user.js';
import {
  formatHTTPResponse,
  formatLimitAndPage,
} from '../helpers/formatters.js';

const createUser = async (req, res) => {
  const userService = new UsersService();
  const result = await userService.createUser(req.body);

  const { statusCode, results } = formatHTTPResponse(201, result);

  if (statusCode !== 201) {
    return res.status(statusCode).json({ results });
  }

  return res.status(statusCode).json({ results: { user: results } });
};

const getUser = async (req, res) => {
  const { uid } = req.params;

  const userService = new UsersService();
  const result = await userService.getUserById(uid);
  const { statusCode, results } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

const getAllUsers = async (req, res) => {
  const { limit, page } = formatLimitAndPage(req.query);
  const userService = new UsersService();

  let statusCode = 200;

  const results = await userService.getUsers(limit, page);
  if (results.err) statusCode = 500;

  return res.status(statusCode).json({ results });
};

const updateUser = async (req, res) => {
  const { uid } = req.params;
  req.body.id = uid;
  const userService = new UsersService();

  const result = await userService.updateUser(req.body);

  const { statusCode, results } = formatHTTPResponse(200, result);

  if (results.err) {
    return res.status(statusCode).json({ results });
  }

  return res.status(statusCode).send();
};

const deleteUser = async (req, res) => {
  const { uid } = req.params;
  const userService = new UsersService();

  const result = await userService.deleteUser(uid);

  const { statusCode, results } = formatHTTPResponse(200, result);

  if (results.err) {
    return res.status(statusCode).json({ results });
  }

  return res.status(statusCode).send();
};

export { createUser, getUser, getAllUsers, updateUser, deleteUser };
