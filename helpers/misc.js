const splitPersonNames = (person) => {
  let [lastName, names] = person.split(',');
  lastName = lastName.trim().toUpperCase();
  names = names.trim().toUpperCase();
  return { lastName, names };
};

module.exports = {
  splitPersonNames,
};
