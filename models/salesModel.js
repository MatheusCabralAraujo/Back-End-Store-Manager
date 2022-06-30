const connection = require('./connection');

const getAll = async () => {
const [sales] = await connection.execute(
 `SELECT sales_p.sale_id, sales.date, sales_p.product_id, sales_p.quantity
 FROM StoreManager.sales AS sales
 INNER JOIN StoreManager.sales_products AS sales_p
 ON sales.id = sales_p.sale_id`,
);
return sales;
};

const getById = async (id) => {
  const query = `SELECT sa.date, sp.product_id AS productId, sp.quantity
  FROM sales AS sa
  INNER JOIN sales_products AS sp
  ON sp.sale_id = sa.id
  WHERE sp.sale_id = ?`;

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const createSale = async (sales) => {
  const dateQuery = 'INSERT INTO sales (date) VALUES (NOW());';

  const [dateAdded] = await connection.execute(dateQuery);

  const insertQuery = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

  sales.forEach(async (sale) => {
    await connection.execute(insertQuery, [dateAdded.insertId, sale.productId, sale.quantity]);
  });

  const createdSales = {
    id: dateAdded.insertId,
    itemsSold: sales,
  };
  
  return createdSales;
};

module.exports = {
  getAll,
  getById,
  createSale
};