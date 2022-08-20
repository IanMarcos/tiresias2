import MaterialService from '../services/material.js';
import { sanitizeAuthors } from '../middlewares/material-validations.js';
import {
  formatHTTPResponse,
  formatLimitAndPage,
} from '../helpers/formatters.js';

const getMaterial = async (req, res) => {
  const { id } = req.params;
  const result = await MaterialService.getMaterialById(id);
  const { statusCode, results } = formatHTTPResponse(200, result);

  res.status(statusCode).json({ results });
};

const getAllMaterials = async (req, res) => {
  const { limit, page } = formatLimitAndPage(req.query);

  let statusCode = 200;

  const results = await MaterialService.getMaterials(limit, page);
  if (results.err) statusCode = 500;

  res.status(statusCode).json({ results });
};

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
   * de la cantidad de autores. El error nunca ocurre con los colaboradores...
   */
  sanitizeAuthors(req);

  const result = await MaterialService.createMaterial(req.body);

  const { results, statusCode } = formatHTTPResponse(201, result);

  res.status(statusCode).json({ results });
};

const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  let statusCode = 200;

  const results = await MaterialService.deleteMaterial(id);

  if (results.err) {
    statusCode = 404;
    return res.status(statusCode).json({ results });
  }

  return res.status(statusCode).send();
};

export { getMaterial, getAllMaterials, createMaterial, deleteMaterial };
