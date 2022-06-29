const express = require('express');

const app = express();
app.use(express.json());
const Products = require('./controllers/productsController');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.get('/products', Products.getAll);

app.get('/products/:id', Products.getById);


module.exports = app;