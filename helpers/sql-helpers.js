const extractSqlError = (errorObj) => {
  if (errorObj.nativeError && errorObj.nativeError.sqlMessage) {
    return errorObj.nativeError.sqlMessage;
  }
  if (errorObj.code && errorObj.code === 'ECONNREFUSED') {
    return 'Base de datos fuera de linea';
  }
  return null;
};

export {
  extractSqlError,
};
