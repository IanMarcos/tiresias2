import path from 'path';
import multer from 'multer';

const getStorageConfig = () => (
  multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  })
);

const uploadFile = (req, res, next) => {
  const multerMiddleware = multer({ storage: getStorageConfig() });
  const upload = multerMiddleware.single('materialFile');

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ results: { err: '40003 el archivo no fue nombrado con la llave correcta' } });
    }
    if (err) {
      return res.status(500).json({ results: { err: 'Error inesperado subiendo el arrchivo' } });
    }

    return next();
  });
};

export {
  uploadFile,
};
