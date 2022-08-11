import { Material, PersonMaterial, PersonRole } from '../models/index.js';
import { MaterialDAO, RolesDAO, PersonMaterialDAO } from '../dao/index.js';
import { replacePropertyPersonasWithAutores } from '../helpers/db-results.js';

class UnifiedSearchService {
  static async searchMaterialsandAuthors({ query, limit, page }) {
    try {
      // Buscar materiales que incluyan el término
      const materials = await MaterialDAO.search(Material, {
        query,
        limit,
        page,
      });

      if (materials.length !== 0) {
        // Objection no trae soporte para convertir la funcion_id de las personas a su respectivo
        // nombre. Se hace manualmente
        const authorRoleId = await RolesDAO.getRoleId(PersonRole, 'Autor');
        replacePropertyPersonasWithAutores(authorRoleId, materials);
      }

      const authors = await PersonMaterialDAO.searchPeopleByRol(
        PersonMaterial,
        { query }
      );
      return { materials, authors };
    } catch (error) {
      return { err: error.message };
    }
  }
}

export default UnifiedSearchService;
