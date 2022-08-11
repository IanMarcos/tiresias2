const convertBytesToMB = (bytes) => bytes / 1024 ** 2;

const getFileFormatFromMimetype = (mimetype) => mimetype.split('/')[1];

const isDefined = (variable) => typeof variable !== 'undefined';

const isPasswordStrong = (password) => {
  // TODO maybe add to a configuration file
  const passwordRegexp =
    /(?=.*[0-9])(?=.*[a-z|A-Z])(?=.*[!*?+\-_@#$^%&])(?=.{8,})/;
  return passwordRegexp.test(password) && password.length < 17;
};

// TODO double check the case if no ',' is included
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
      if (err.includes('404') || err.includes('401')) {
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

export {
  convertBytesToMB,
  formatHTTPResponse,
  getFileFormatFromMimetype,
  isDefined,
  isPasswordStrong,
  splitPersonNames,
};
