const searchMaterialsAndAuthors = (req, res) => {
  // Se pasa al service encargado de la busqueda unificada

  res.status(200).json({msg: 'All good'});
}

module.exports = {
  searchMaterialsAndAuthors
}