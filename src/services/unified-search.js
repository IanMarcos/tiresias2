/* eslint-disable no-param-reassign */
import { Material, PersonMaterial, PersonRole } from '../models/index.js';
import { MaterialDAO, RolesDAO, PersonMaterialDAO } from '../dao/index.js';
import { replacePeopleWithRoles } from '../helpers/formatters.js';

class UnifiedSearchService {
  static async searchMaterialsandAuthors({ searchTerm, formatId, limit, page }) {
    try {
      const materials = await MaterialDAO.search(Material, {
        searchTerm,
        formatId,
        limit,
        page,
      });

      if (materials.length !== 0) {
        const roles = await RolesDAO.getAllRoles(PersonRole);
        materials.forEach((material) =>
          replacePeopleWithRoles(material, roles)
        );
      }

      const authors = await PersonMaterialDAO.searchPeopleByRol(
        PersonMaterial,
        { searchTerm }
      );

      authors.forEach((author) => {
        author.id = author.personaId;
        delete author.personaId;
      });
      return { materials, authors };
    } catch (error) {
      return { err: error.message };
    }
  }
}

export default UnifiedSearchService;
