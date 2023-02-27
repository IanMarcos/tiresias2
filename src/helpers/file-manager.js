import fs from 'fs';
import path from 'path';

const getFilePath = (filePath, fileName) => {
  if (!filePath || !fileName) {
    throw new Error('No params provided');
  }

  return path.format({ dir: filePath, base: fileName });
};

const fileExists = (filePath) => fs.existsSync(filePath);

const deleteFile = (filePath, fileName) => {
  if (!filePath) {
    throw new Error('No params provided');
  }

  const fullPath = fileName
    ? path.format({ dir: filePath, base: fileName })
    : filePath;

  if (!fs.existsSync(fullPath)) {
    return;
  }

  fs.unlink(fullPath, (err) => {
    if (err) {
      throw new Error('No se pudo eliminar el archivo');
    }
  });
};

export { getFilePath, fileExists, deleteFile };
