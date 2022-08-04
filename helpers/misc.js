const convertBytesToMB = (bytes) => bytes / 1024 ** 2;

const getFileFormatFromMimetype = (mimetype) => (
  mimetype.split('/')[1]
);

const splitPersonNames = (person) => {
  let [lastName, names] = person.split(',');
  lastName = lastName.trim().toUpperCase();
  names = names.trim().toUpperCase();
  return { lastName, names };
};

export {
  convertBytesToMB,
  getFileFormatFromMimetype,
  splitPersonNames,
};
