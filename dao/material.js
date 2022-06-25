const { raw } = require('objection');
const Material = require('../models/material');

const search = async ({ searchTerm, limit, page }) => {
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
    return { err: 'Error 50001' };
  }
};

module.exports = {
  search,
};
