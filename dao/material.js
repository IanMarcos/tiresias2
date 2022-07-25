const { raw } = require('objection');
const { extractSqlError } = require('../helpers/sql-helpers');

class MaterialDAO {
  // TODO document this class
  static async create(Material, materialData) {
    try {
      return await Material.query().insert(materialData);
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  static async search(Material, { searchTerm, limit, page }) {
    try {
      const materials = await Material.query()
        .withGraphFetched('personas')
        .select('Material.id', 'titulo', 'edicion', 'año_publicacion', 'Editorial.nombre AS editorial')
        .innerJoin('Editorial', 'Material.editorial_id', 'Editorial.id')
        .where(raw(`MATCH(titulo) AGAINST ('${searchTerm}' IN NATURAL LANGUAGE MODE)`))
        .limit(limit)
        .offset(limit * page);

      return materials;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }
}

module.exports = MaterialDAO;
