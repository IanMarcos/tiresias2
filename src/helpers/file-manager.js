import fs from 'fs';
import path from 'path';

const getFilePath = (filePath, fileName = '') => {
  if (!filePath) {
    throw new Error('No params provided');
  }

  return path.format({ dir: filePath, base: fileName });
};

const fileExists = (filePath) => fs.existsSync(filePath);

const deleteFile = (filePath, fileName = '') => {
  if (!filePath) {
    throw new Error('No params provided');
  }

  const fullPath = path.format({ dir: filePath, base: fileName });

  fs.unlink(fullPath, (err) => {
    if (err) {
      throw new Error('No se pudo eliminar el archivo');
    }
  });
};

export { getFilePath, fileExists, deleteFile };
