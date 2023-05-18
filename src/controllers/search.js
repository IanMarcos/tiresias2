import { formatLimitAndPage } from '../helpers/formatters.js';
import UnifiedSearchService from '../services/unified-search.js';

const searchMaterialsAndAuthors = async (req, res) => {
  const { limit, page } = formatLimitAndPage(req.query);

  const { searchTerm, formatId, category } = req.body;
  const results = await UnifiedSearchService.searchMaterialsandAuthors({
    searchTerm,
    formatId,
    category,
    limit,
    page,
  });
  if (results.err) return res.status(500).json({ results });

  return res.status(200).json({ results });
};

export { searchMaterialsAndAuthors };
