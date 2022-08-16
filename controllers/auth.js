import UsersService from '../services/user.js';
import { formatHTTPResponse } from '../helpers/formatters.js';

const signIn = async (req, res) => {
  const userService = new UsersService();

  try {
    const result = await userService.authenticateUser(req.body);

    const { results, statusCode } = formatHTTPResponse(200, result);

    res.status(statusCode).json({ results });
  } catch (error) {
    res.status(500).json({ results: { err: { error } } });
  }
};

export { signIn };
