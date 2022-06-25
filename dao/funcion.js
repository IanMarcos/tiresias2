const RolPersona = require('../models/rol-persona');

const getAuthorId = async() => {
  try {
    const authorId = await RolPersona.query()
      .where('nombre', 'Autor');
    return authorId[0].id;
  } catch (error) {
    return {err: '50002'}
  }

}
module.exports = {
  getAuthorId
};
