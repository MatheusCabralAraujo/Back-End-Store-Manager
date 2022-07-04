const salesModel = require('../models/salesModel');
const { validateSale } = require('../middlewares/validationsSales');

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

  const createSale = async (sales) => {
    const verifySale = validateSale(sales);
    if (verifySale) {
    const e = new Error(verifySale.message);
    e.code = verifySale.status;
    throw e;
  }
    const newSales = await salesModel.createSale(sales);
 
   return newSales;
 };

module.exports = {
  getAll,
  getById,
  createSale,
};