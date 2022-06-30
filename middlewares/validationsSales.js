const validateSale = (sales) => {
  const Validation = sales.map((e) => {
    if (!e.productId) return { status: 400, message: '"productId" is required' };
    if (!e.quantity) return { status: 400, message: '"quantity" is required' };
    if (e.quantity <= 0) {
      return { status: 422, message: '"quantity" must be greater than or equal to 1' };
    }
    return false;
  });
  return Validation;
};

module.exports = {
  validateSale,
};