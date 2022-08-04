class PersonRoleDAO {
  // TODO document
  static async getRoleId(PersonRole, role = 'Autor') {
    try {
      const [foundRole] = await PersonRole.query()
        .where('nombre', role);

      if (!foundRole) {
        throw new Error('EDB01');
      }

      return foundRole.id;
    } catch (error) {
      let msg = 'EDA02';
      if (error.message === 'EDB01') msg = 'EDB01';
      throw new Error(msg);
    }
  }
}

export default PersonRoleDAO;
