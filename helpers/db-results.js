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
    const updatedMat = material;
    updatedMat.autores = authors;
    delete updatedMat.personas;
    return updatedMat;
  })
);

module.exports = {
  insertAuthors,
};
