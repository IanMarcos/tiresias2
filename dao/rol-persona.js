class RolPersonaDAO {
  // Obtiene el ID del rol 'Autor'
  static async getRoleAuthorId(RolPersona) {
    try {
      const [role] = await RolPersona.query()
        .where('nombre', 'Autor');
      if (!role) throw new Error('EDB01');
      return role.id;
    } catch (error) {
      let msg = 'EDA02';
      if (error.message === 'EDB01') msg = 'EDB01';
      throw new Error(msg);
    }
  }
}

module.exports = RolPersonaDAO;
