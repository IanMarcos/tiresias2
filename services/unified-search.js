const { Material, PersonaMaterial, RolPersona } = require('../models');
const { MaterialDAO, RolPersonaDAO, PersonaMaterialDAO } = require('../dao');
const { insertAuthors } = require('../helpers/db-results');

class UnifiedSearchService {
  static async searchMaterialsandAuthors({ searchTerm, limit, page }) {
    try {
      // Buscar materiales que incluyan el término
      let materials = await MaterialDAO.search(Material, { searchTerm, limit, page });

      if (materials.length !== 0) {
        // Objection no trae soporte para convertir la funcion_id de las personas a su respectivo
        // nombre. Se hace manualmente
        const authorId = await RolPersonaDAO.getRoleAuthorId(RolPersona);
        materials = insertAuthors(authorId, materials);
      }

      // Buscar autores que coincidan con el término
      const authors = await PersonaMaterialDAO.searchPeopleByRol(PersonaMaterial, { searchTerm });
      return { materials, authors };
    } catch (error) {
      return { err: error.message };
    }
  }
}

module.exports = UnifiedSearchService;
