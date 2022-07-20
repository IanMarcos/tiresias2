const extractSqlError = (errorObj) => {
  if (errorObj.nativeError && errorObj.nativeError.sqlMessage) {
    return errorObj.nativeError.sqlMessage;
  }
  return null;
};

module.exports = {
  extractSqlError,
};
