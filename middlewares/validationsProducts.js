const { getById } = require('../models/productsModel');

const verifyName = (name) => {
    if (!name) return { status: 400, message: '"name" is required' };
  
    if (name.length < 5) {
      return { status: 422, message: '"name" length must be at least 5 characters long' };
    }
  };

const validateProductId = async (id) => {
    const result = await getById(id);
    console.log(result);
    if (!result) {
      return { status: 404, message: 'Product not found' };
    }
  };

module.exports = {
  verifyName,
  validateProductId,
};