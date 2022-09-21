import fs from 'fs';

const deleteFile = (filePath) => {
  if (!filePath) {
    throw new Error('No params provided');
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      throw new Error('No se pudo eliminar el archivo');
    }
  });
};

export { deleteFile };
