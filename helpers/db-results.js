const insertAuthors = (authorId, materials) => {
  return materials.map(material => {
    const authors = material.personas.filter( persona => {
      if(persona.funcion === authorId){
        delete persona.funcion;
        return true;
      }
      return false;
    });
    material.autores = authors;
    delete material.personas;
    return material;
  });
}

module.exports = {
  insertAuthors
};
