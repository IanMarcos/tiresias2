class RolPersonaDAO {
  // Obtiene el ID del rol 'Autor'
  static async getRoleId(RolPersona, role = 'Autor') {
    try {
      const [foundRole] = await RolPersona.query()
        .where('nombre', role);
      if (!foundRole) throw new Error('EDB01');
      return foundRole.id;
    } catch (error) {
      let msg = 'EDA02';
      if (error.message === 'EDB01') msg = 'EDB01';
      throw new Error(msg);
    }
  }
}

module.exports = RolPersonaDAO;
