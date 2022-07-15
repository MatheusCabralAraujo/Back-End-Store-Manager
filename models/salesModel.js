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

const getSaleById = async (id) => {
  const query = `SELECT sa.date, sp.product_id AS productId, sp.quantity
  FROM sales AS sa
  INNER JOIN sales_products AS sp
  ON sp.sale_id = sa.id
  WHERE sp.sale_id = ?`;

  const [sale] = await connection.execute(query, [id]);
  if (sale.length === 0) return null;
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

const deleteSale = async (id) => {
  const querySale = `DELETE FROM sales
    WHERE id = ?`;
  await connection.execute(querySale, [id]);

  const querySaleProduct = `DELETE FROM sales_products
    WHERE sale_id = ?`;
  await connection.execute(querySaleProduct, [id]);
};

const updateSale = async (data) => {
   //  const query1 = 'SELECT * FROM sales_products WHERE sale_id = ? AND product_id = ?';
  // const [verify] = await connection.execute(query1, [data.id, data.sales.productId]);
  // if (verify.length === 0) {
    // return false;
 //  }
  const teste = await Promise.all(data.sales.map((element) => {
    console.log(element);
    return connection.execute(
      `
      UPDATE sales_products 
      SET quantity = ? 
      WHERE sale_id = ? AND product_id = ?
      `,
      [element.quantity, data.id, element.productId],
    );
  }));
  
 // const [[{ affectedRows }]] = teste;
  return teste;
};

module.exports = {
  getAll,
  getSaleById,
  createSale,
  deleteSale,
  updateSale,
};