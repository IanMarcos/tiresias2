import { Material, PersonMaterial, PersonRole } from '../models/index.js';
import { MaterialDAO, RolesDAO, PersonMaterialDAO } from '../dao/index.js';
import { replacePeopleWithRoles } from '../helpers/formatters.js';

class UnifiedSearchService {
  static async searchMaterialsandAuthors({ query, limit, page }) {
    try {
      const materials = await MaterialDAO.search(Material, {
        query,
        limit,
        page,
      });

      if (materials.length !== 0) {
        const roles = await RolesDAO.getAllRoles(PersonRole);
        replacePeopleWithRoles(materials, roles);
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
