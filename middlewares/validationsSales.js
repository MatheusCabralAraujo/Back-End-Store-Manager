const { getById } = require('../models/productsModel');

const validateSale = (sales) => {
  const Validation = sales.map((e) => {
    if (!e.productId) return { status: 400, message: '"productId" is required' };
    if (!e.quantity && e.quantity !== 0) return { status: 400, message: '"quantity" is required' };
    if (e.quantity <= 0) {
      return { status: 422, message: '"quantity" must be greater than or equal to 1' };
    }
    return false;
  });
  return Validation;
};

const validateProductId = async (sales) => {
  const verification = await Promise.all(sales.map(async (element) => {
    const result = await getById(element.productId);
    console.log(result);
    if (!result) {
      return { status: 404, message: 'Product not found' };
    }
    return false;
  }));
  return verification;
};

module.exports = {
  validateSale,
  validateProductId,
};