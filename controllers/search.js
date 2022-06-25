const UnifiedSearchService = require('../service/unified-search');

const searchMaterialsAndAuthors = async (req, res) => {
  // Se configura la página y el número de resultados por página
  let { limit = 10, page = 1 } = req.query;
  if (Number.isNaN(Number(limit)) || Number.isNaN(Number(page)) || limit <= 0 || page <= 0) {
    limit = 10;
    page = 1;
  }
  if (page > 0) page -= 1;

  // Se pasa al service encargado de la busqueda unificada
  const { searchTerm } = req.body;
  const unifiedSearcher = new UnifiedSearchService();
  const results = await unifiedSearcher.searchMaterialsandAuthors({ searchTerm, limit, page });

  if (results.err) return res.status(500).json({ results });

  return res.status(200).json({ results });
};

module.exports = {
  searchMaterialsAndAuthors,
};
