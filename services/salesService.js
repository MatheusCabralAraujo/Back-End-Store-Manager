const salesModel = require('../models/salesModel');
const { validateSale, validateProductId,
validateSaleId } = require('../middlewares/validationsSales');

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

  const getSaleById = async (id) => {
    const saleById = await salesModel.getSaleById(id);
   if (!saleById) {
    throw new Error('Sale not found');
  }

  return saleById;
};

  const createSale = async (sales) => {
    const verifySale = validateSale(sales); 
    const teste = verifySale.some((e) => e.message);
    if (teste) {
      const find = verifySale.find((e) => e !== false);
    const e = new Error(find.message);
    e.code = find.status;
    throw e;
    }
    const verifyProductId = await validateProductId(sales);
    // console.log(verifyProductId);
    const find = verifyProductId.find((element) => element !== false);
   if (find) {
     const error = new Error(find.message);
     error.code = find.status;
      throw error;
    }
    const newSales = await salesModel.createSale(sales);
 
   return newSales;
};
 
const deleteSale = async (id) => {
  const deleteTest = await validateSaleId(id);
  console.log(deleteTest);
  if (deleteTest) {
    const e = new Error(deleteTest.message);
    e.code = deleteTest.status;
    throw e;
  }
  await salesModel.deleteSale(id);
};

module.exports = {
  getAll,
  getSaleById,
  createSale,
  deleteSale,
};