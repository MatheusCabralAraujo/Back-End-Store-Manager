const salesModel = require('../models/salesModel');

const getAll = async () => {
    const sales = await salesModel.getAll();
  
    if (!sales) {
      throw new Error('Sales not found');
    }
  
    const salesDisplay = sales.map((sale) => ({
      saleId: sale.sale_id,
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
    }));
  
    return salesDisplay;
  };

  const getById = async (id) => {
    const saleById = await salesModel.getById(id);
  
    return saleById;
  };

module.exports = {
  getAll,
  getById,
};