const salesModel = require('../models/salesModel');
const { validateSale, validateProductId,
validateSaleId, error } = require('../middlewares/validationsSales');

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
     const err = new Error(find.message);
     err.code = find.status;
      throw err;
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

const updateSale = async (data) => {
    const verifyReqFormat = validateSale(data.sales); 
    const teste = verifyReqFormat.some((e) => e.message);
    if (teste) {
      const find = verifyReqFormat.find((e) => e !== false);
      const e = new Error(find.message);
      e.code = find.status;
    throw e;
    }
  const verifySaleId = await validateSaleId(data.id);
  if (verifySaleId) throw error(verifySaleId.status, verifySaleId.message);
  
  const verifyProductId = await validateProductId(data.sales);
  const find = verifyProductId.find((element) => element !== false);
  if (find) throw error(find.status, find.message);
  const updatedSales = await salesModel.updateSale(data);
   return updatedSales;
};

module.exports = {
  getAll,
  getSaleById,
  createSale,
  deleteSale,
  updateSale,
};