/* eslint-disable no-param-reassign */
import { extractRolesIds } from './utils.js';

const convertBytesToMB = (bytes) => bytes / 1024 ** 2;

const splitPersonNames = (person) => {
  if (!person.includes(',')) {
    return { lastName: person, names: '' };
  }
  let [lastName, names] = person.split(',');
  lastName = lastName.trim().toUpperCase();
  names = names.trim().toUpperCase();
  return { lastName, names };
};

const formatHTTPResponse = (initialStatus, data) => {
  let statusCode = initialStatus;
  let results = {};

  const { err } = data;
  if (err) {
    if (typeof err === 'string') {
      if (err.includes('400') || err.includes('401') || err.includes('404')) {
        [results.err, statusCode] = err.split('/');
        statusCode = parseInt(statusCode, 10);
      } else if (err.includes('Duplicate')) {
        results.err = err;
        statusCode = 409;
      } else {
        results.err = err;
        statusCode = 500;
      }
    } else {
      results.err = err;
      statusCode = 500;
    }
  } else {
    results = { ...data };
  }

  return { results, statusCode };
};

const formatLimitAndPage = ({ limit = 10, page = 1 }) => {
  if (
    Number.isNaN(Number(limit)) ||
    Number.isNaN(Number(page)) ||
    limit <= 0 ||
    page <= 0
  ) {
    limit = 10;
    page = 1;
  }
  if (page > 0) page -= 1;

  return { limit, page };
};

/**
 * Function to replace the 'personas' property in all materials for 'autores', 'contribuidores' and 'narrator'
 * @param {Array} materials Array of objects. Each material must include the property 'personas'
 * @param {Array} roles Array of objects. Each role must contain id and name.
 */
const replacePeopleWithRoles = (materials, roles) => {
  const { authorRoleId, contributorRoleId, narratorRoleId } =
    extractRolesIds(roles);

  materials.forEach((material) => {
    const authors = [];
    const contributors = [];
    let narrator = null;

    material.personas.forEach((persona) => {
      if (persona.rol === authorRoleId) {
        delete persona.rol;
        authors.push(persona);
        return;
      }

      if (persona.rol === contributorRoleId) {
        delete persona.rol;
        contributors.push(persona);
        return;
      }

      if (persona.rol === narratorRoleId) {
        delete persona.rol;
        narrator = persona;
      }
    });

    material.autores = authors;
    material.contribuidores = contributors;
    material.narrador = narrator;
    delete material.personas;
  });
};

const removeIdsFromMaterial = (materialObj) => {
  delete materialObj.formatoAccesibleId;
  delete materialObj.editorialId;
  delete materialObj.ciudadPublicacionId;
  delete materialObj.productoraId;
  delete materialObj.ciudadProduccionId;
  delete materialObj.estadoProduccionId;
  delete materialObj.eliminado;
};

const removeIdFromObj = (Obj) => delete Obj.id;

export {
  convertBytesToMB,
  formatHTTPResponse,
  formatLimitAndPage,
  splitPersonNames,
  replacePeopleWithRoles,
  removeIdsFromMaterial,
  removeIdFromObj,
};
