const createUser = async (req, res) => {
  // const { userName, password, name, role } = req.body;

  // TODO delete bcrypt
  // const hashedPassword = await hashPassword(password);

  res.status(201).send();
};

export {
  createUser,
};
