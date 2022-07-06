class PersonaMaterialDAO {
  // Busca personas de acuerdo a un término de busqueda y a un rol
  static async searchPeopleByRol(PersonaMaterial, { searchTerm, personRol = 'Autor' }) {
    try {
      const people = await PersonaMaterial.query()
        .select('persona_id', 'Persona.apellido', 'Persona.nombres')
        .join('Persona', 'Persona.id', 'PersonaMaterial.persona_id')
        .join('RolPersona', 'RolPersona.id', 'PersonaMaterial.rol_persona_id')
        .where((builder) => {
          builder
            .where('Persona.apellido', 'like', `%${searchTerm}%`)
            .orWhere('Persona.nombres', 'like', `%${searchTerm}%`)
            .andWhere('RolPersona.nombre', '=', `${personRol}`);
        })
        .groupBy('persona_id');

      return people;
    } catch (error) {
      throw new Error('EDA03');
    }
  }
}

module.exports = PersonaMaterialDAO;
