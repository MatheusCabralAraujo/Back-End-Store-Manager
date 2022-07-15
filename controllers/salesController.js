const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();
  
    res.status(200).json(sales);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await salesService.getSaleById(id);
    return res.status(200).json(saleById);
  } catch (error) {
     return res.status(404).json({ message: error.message });
  }
};

const createSale = async (req, res) => {
  try {
    const sales = req.body;
    const sale = await salesService.createSale(sales);
    return res.status(201).json(sale);
  } catch (error) {
  return res.status(error.code).json({ message: error.message });
}
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    await salesService.deleteSale(id);
    res.status(204).end();
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    const sale = await salesService.updateSale({ id, sales });
    console.log(sale);
    return res.status(200).json({ saleId: id, itemsUpdated: sales });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSaleById,
  createSale,
  deleteSale,
  updateSale,
};