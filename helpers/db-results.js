/* eslint-disable no-param-reassign */
const insertAuthors = (authorId, materials) => (
  materials.map((material) => {
    const authors = material.personas.filter((persona) => {
      if (persona.rol === authorId) {
        delete persona.rol;
        return true;
      }
      return false;
    });
    material.autores = authors;
    delete material.personas;
    return material;
  })
);

module.exports = {
  insertAuthors,
};
