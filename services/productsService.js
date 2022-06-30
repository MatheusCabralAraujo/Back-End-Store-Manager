const productsModel = require('../models/productsModel');
const { verifyName } = require('../middlewares/validationsProducts');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const products = await productsModel.getById(id);

  if (!products) {
    throw new Error('Product not found');
  }

  return products;
};

const createProduct = async (name) => {

  verifyName(name);

  const newProduct = await productsModel.createProduct(name);

  return newProduct;
};

const deleteProduct = async (id) => {
 
  await getById(id);

  await productsModel.deleteProduct(id);

  return id;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  deleteProduct
};