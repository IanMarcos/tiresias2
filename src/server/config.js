import path, { dirname } from 'path';
import findRemoveSync from 'find-remove';
import { fileURLToPath } from 'url';

const startUnusedFilesCleaner = (directory) => {
  const baseDirname = dirname(fileURLToPath(import.meta.url));
  setInterval(() => {
    findRemoveSync(path.join(baseDirname, '..', directory), {
      files: '*.*',
      age: { seconds: 180 },
    });
  }, 60000);
};

export { startUnusedFilesCleaner };
