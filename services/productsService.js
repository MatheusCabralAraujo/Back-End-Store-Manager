const productsModel = require('../models/productsModel');
const { verifyName, validateProductId } = require('../middlewares/validationsProducts');

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
  // console.log(name);
  const teste = verifyName(name);
  // console.log(teste);
  if (teste) {
    const e = new Error(teste.message);
    e.code = teste.status;
    throw e;
  }

  const newProduct = await productsModel.createProduct(name);

  return newProduct;
};

const updateProduct = async (id, name) => {
  const validateName = verifyName(name);
  console.log(validateName);
  if (validateName) {
    const e = new Error(validateName.message);
    e.code = validateName.status;
    throw e;
  }
    const verifyProductId = await validateProductId(id);
    if (verifyProductId) {
     const error = new Error(verifyProductId.message);
     error.code = verifyProductId.status;
      throw error;
    }
    const newSales = await productsModel.updateProduct(id, name);
 
   return newSales;
};

const deleteProduct = async (id) => {
  const locateProduct = await productsModel.getById(id);

  if (!locateProduct) throw new Error('Product not found');

  await productsModel.deleteProduct(id);

  return id;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};