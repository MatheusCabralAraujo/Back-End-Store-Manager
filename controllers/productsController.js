const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try { 
    const products = await productsService.getAll();
    return res.status(200).json(products);
} catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try { 
    const { id } = req.params;
    const product = await productsService.getById(id);
    return res.status(200).json(product);
} catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productsService.createProduct(name);
    return res.status(201).json(product);
} catch (error) {
  return res.status(error.code).json({ message: error.message });
}
};

const updateProduct = async (req, res) => {
  try {
  const { id } = req.params;
  const { name } = req.body;

  const productUpdate = await productsService.updateProduct(id, name);

  return res.status(200).json(productUpdate);
} catch (error) {
  return res.status(404).json({ message: error.message });
}
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productsService.deleteProduct(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  };