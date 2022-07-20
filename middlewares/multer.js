const path = require('path');
const multer = require('multer');

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

const getMulterMiddleware = () => (
  multer({ storage: getStorageConfig() })
);

module.exports = {
  getMulterMiddleware,
};
