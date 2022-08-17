import UnifiedSearchService from '../services/unified-search.js';

const searchMaterialsAndAuthors = async (req, res) => {
  let { limit = 10, page = 1 } = req.query;
  if (
    Number.isNaN(Number(limit)) ||
    Number.isNaN(Number(page)) ||
    limit <= 0 ||
    page <= 0
  ) {
    limit = 10;
    page = 1;
  }
  if (page > 0) page -= 1;

  const { query } = req.body;
  const results = await UnifiedSearchService.searchMaterialsandAuthors({
    query,
    limit,
    page,
  });
  if (results.err) return res.status(500).json({ results });

  return res.status(200).json({ results });
};

export { searchMaterialsAndAuthors };
