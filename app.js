const express = require('express');

const app = express();
app.use(express.json());
const Products = require('./controllers/productsController');
const Sales = require('./controllers/salesController');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.get('/products', Products.getAll);

app.get('/products/:id', Products.getById);

app.post('/products', Products.createProduct);

app.put('/products/:id', Products.updateProduct);

app.delete('/products/:id', Products.deleteProduct);

app.get('/sales', Sales.getAll);

app.get('/sales/:id', Sales.getById);

app.post('/sales', Sales.createSale);

app.delete('/sales/:id', Sales.deleteSale);

module.exports = app;