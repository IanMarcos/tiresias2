import { Material, PersonMaterial, PersonRole } from '../models/index.js';
import { MaterialDAO, PersonRoleDAO, PersonMaterialDAO } from '../dao/index.js';
import { replacePropertyPersonasWithAutores } from '../helpers/db-results.js';

class UnifiedSearchService {
  static async searchMaterialsandAuthors({ searchTerm, limit, page }) {
    try {
      // Buscar materiales que incluyan el término
      const materials = await MaterialDAO
        .search(Material, { searchQuery: searchTerm, limit, page });

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

export default UnifiedSearchService;
