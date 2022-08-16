const areStringsEqual = (a, b) =>
  a.localeCompare(b, 'es', { sensitivity: 'base' }) === 0;

const getFileFormatFromMimetype = (mimetype) => mimetype.split('/')[1];

const isDefined = (variable) => typeof variable !== 'undefined';

const isPasswordStrong = (password) => {
  // TODO maybe add to a configuration file
  const passwordRegexp =
    /(?=.*[0-9])(?=.*[a-z|A-Z])(?=.*[!*?+\-_@#$^%&])(?=.{8,})/;
  return passwordRegexp.test(password) && password.length < 17;
};

const extractRolesIds = (rolesList) => {
  let authorRoleId;
  let contributorRoleId;
  let narratorRoleId;

  rolesList.forEach((role) => {
    if (role.nombre === 'Autor') authorRoleId = role.id;
    if (role.nombre === 'Contribuidor') contributorRoleId = role.id;
    if (role.nombre === 'Narrador') narratorRoleId = role.id;
  });

  return {
    authorRoleId,
    contributorRoleId,
    narratorRoleId,
  };
};

export {
  areStringsEqual,
  extractRolesIds,
  getFileFormatFromMimetype,
  isDefined,
  isPasswordStrong,
};
