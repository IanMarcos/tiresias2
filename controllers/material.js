const MaterialService = require('../services/material');

const createMaterial = async (req, res) => {
  const results = await MaterialService.createMaterial(req.body);
  // const { err } = results;
  // if (err) {
  //   if (typeof (err) === 'string' && err.includes('404')) { // TODO ask if string
  //     [results.err] = err.split('/');
  //     return res.status(404).json({ results });
  //   }
  //   return res.status(500).json({ results });
  // }
  return res.status(201).json({ results });
};

module.exports = {
  createMaterial,
};
