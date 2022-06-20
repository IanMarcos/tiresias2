const Funcion = require('../models/funcion');

const getAuthorId = async() => {
  try {
    const authorId = await Funcion.query()
      .where('nombre', 'Autor');
    return authorId[0].id;
  } catch (error) {
    return {err: '50002'}
  }

}
module.exports = {
  getAuthorId
};
