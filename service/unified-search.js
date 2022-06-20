const { search } = require('../dao/material');
const { getAuthorId } = require('../dao/funcion');
const { searchPersonByRol } = require('../dao/persona-material');
const { insertAuthors } = require('../helpers/db-results');

class unifiedSearchService {
  async searchMaterialsandAuthors({ searchTerm, limit, page }) {
    // Buscar materiales que incluyan el término
    let materials = await search({searchTerm, limit, page});
    if(materials.err) return materials;
    
    if(materials.length !== 0){
      // Objection no trae soporte para convertir la funcion_id de las personas a su respectivo nombre
      // Se hace manualmente
      const authorId = await getAuthorId();
      materials = insertAuthors(authorId, materials);
    }
    
    // Buscar autores que coincidan con el término
    const authors = await searchPersonByRol({searchTerm});
    if(authors.err) return authors;

    return {materials, authors};
  }
}

module.exports = unifiedSearchService;
