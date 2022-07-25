const path = require('path');
const findRemoveSync = require('find-remove');

function startUnusedFilesCleaner(directory) {
  setInterval(() => {
    findRemoveSync(path.join(__dirname, '..', directory), {
      files: '*.*',
      age: { seconds: 180 },
    });
  }, 60000);
}

module.exports = { startUnusedFilesCleaner };
