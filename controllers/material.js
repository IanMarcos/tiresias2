const MaterialService = require('../services/material');
const { sanitizeAuthors } = require('../middlewares/material-validations');

const createMaterial = async (req, res) => {
  /**
   * NOTA IMPORTANTE
   * La razón por la que se hace sanitizeAuthors() aquí y no en los middlewares, es porque
   * hacerlo en los middlewares, mientras se recibe un solo autor, hace que express defina
   * los headers de la respuesta tan pronto se ejecuta la transaction dentro de
   * createMaterial(); esto hace que cuando se quiera dar la verdadera respuesta al final
   * del controlador haya un error "ERR_HTTP_HEADERS_SENT".
   * Para replicar el error ejecute sanitizeAuthors en la lista de middlewares de la ruta y
   * asegurese de mandar un único autor. Si sanitizeAuthors está en los middleware pero se mandan
   * varios autores todo funciona normal. Si se ejecuta aquí no habrá errores independiente
   * de la cantidad de autores. El error nunca ocurra con los colaboradores...
   */
  sanitizeAuthors(req);

  const results = await MaterialService.createMaterial(req.body);

  let statusCode = 201;
  const { err } = results;
  if (err) {
    if (typeof (err) === 'string') {
      if (err.includes('404')) {
        [results.err] = err.split('/');
        statusCode = 404;
      } else if (err.includes('Duplicate')) {
        statusCode = 409;
      }
    } else {
      statusCode = 500;
    }
  }

  return res.status(statusCode).json({ results });
};

module.exports = {
  createMaterial,
};
