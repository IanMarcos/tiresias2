const { raw } = require('objection');

class MaterialDAO {
  static async create(Material, materialData) {
    try {
      return await Material.query().insert(materialData);
    } catch (error) {
      // TODO Pass down errors by constrains
      throw new Error('EDA01');
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
      throw new Error('EDA01');
    }
  }
}

module.exports = MaterialDAO;
