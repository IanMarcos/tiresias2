import fs from 'fs';
import path from 'path';

const deleteFile = (filePath, fileName = '') => {
  if (!filePath) {
    throw new Error('No params provided');
  }

  const fullPath = path.format({ root: filePath, name: fileName });

  fs.unlink(fullPath, (err) => {
    if (err) {
      throw new Error('No se pudo eliminar el archivo');
    }
  });
};

export { deleteFile };
