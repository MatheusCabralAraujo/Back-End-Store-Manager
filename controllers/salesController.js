const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();
  
    res.status(200).json(sales);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesService.getById(id);

  if (saleById.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(saleById);
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

module.exports = {
  getAll,
  getById,
  createSale,
};