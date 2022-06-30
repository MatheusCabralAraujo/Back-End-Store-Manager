const connection = require('./connection');

const getAll = async () => {
const [products] = await connection.execute(
  'SELECT * FROM StoreManager.products',
);
return products;
};

const getById = async (id) => {
const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
const [productData] = await connection.execute(query, [id]);

if (productData.length === 0) return null;
  return productData[0];
};

const createProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';

  const [registeredId] = await connection.execute(query, [name]);

  const newProduct = {
    id: registeredId.insertId,
    name,
  };

  return newProduct;
};

const deleteProduct = async (id) => {
  await connection
    .execute(
      'DELETE FROM StoreManager.products WHERE id = ?',
      [id],
    );
};

module.exports = {
  getAll,
  getById,
  createProduct,
  deleteProduct
};