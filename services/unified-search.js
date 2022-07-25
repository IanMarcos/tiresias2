const { Material, PersonMaterial, PersonRole } = require('../models');
const { MaterialDAO, PersonRoleDAO, PersonMaterialDAO } = require('../dao');
const { replacePropertyPersonasWithAutores } = require('../helpers/db-results');

class UnifiedSearchService {
  static async searchMaterialsandAuthors({ searchTerm, limit, page }) {
    try {
      // Buscar materiales que incluyan el término
      const materials = await MaterialDAO.search(Material, { searchTerm, limit, page });

      if (materials.length !== 0) {
        // Objection no trae soporte para convertir la funcion_id de las personas a su respectivo
        // nombre. Se hace manualmente
        const authorRoleId = await PersonRoleDAO.getRoleId(PersonRole, 'Autor');
        replacePropertyPersonasWithAutores(authorRoleId, materials);
      }

      const authors = await PersonMaterialDAO.searchPeopleByRol(PersonMaterial, { searchTerm });
      return { materials, authors };
    } catch (error) {
      return { err: error.message };
    }
  }
}

module.exports = UnifiedSearchService;
