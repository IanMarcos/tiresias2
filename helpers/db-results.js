/* eslint-disable no-param-reassign */
const replacePropertyPersonasWithAutores = (authorRoleId, materials) => (
  materials.forEach((material) => {
    const authors = material.personas.filter((persona) => {
      if (persona.rol === authorRoleId) {
        delete persona.rol;
        return true;
      }
      return false;
    });

    material.autores = authors;
    delete material.personas;
  })
);

module.exports = {
  replacePropertyPersonasWithAutores,
};
