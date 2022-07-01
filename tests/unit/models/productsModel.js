const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const connection = require('../../../models/connection');

describe('Buscando todos os produtos', () => {
  describe('Quando existem produtos', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
    ];

    before(() => {
      sinon.stub(connection, 'execute').resolves([products]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('O retorno deve estar dentro de um array', async () => {
      const res = await productsModel.getAll();
      expect(res).to.be.an('array');
    })

    it('O retorno deve estar com os produtos corretos', async () => {
      const res = await productsModel.getAll();
      expect(res).to.be.equal(products);
    })
  });
});

describe('Buscando apenas 1 produto', () => {
  describe('Quando existe o produto', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[{}]]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('O retorno deve estar dentro de um array', async () => {
      const res = await productsModel.findById(1);
      expect(res).to.be.an('array');
    })

    it('O conteúdo do array deve ser um objeto', async () => {
      const [res] = await productsModel.getAll();
      expect(res).to.be.an('object');
    })
  });
});

describe('Criando 1 produto novo', () => {
  describe('Quando o produto é criado', () => {
    const product = [{
      id: 4,
      name: 'Capacete do Homem de Ferro',
      quantity: 40,
    }]

    before(() => {
      sinon.stub(connection, 'execute').resolves(product);
    })

    after(() => {
      connection.execute.restore();
    })

    it('O retorno deve ser um objeto', async () => {
      const res = await productsModel
        .createProduct({ name: 'Capacete do Homem de Ferro', quantity: 40 });
      expect(res).to.be.an('object');
    })

    it('O conteúdo do objeto deve vir corretamente', async () => {
      const res = await productsModel
        .createProduct({ name: 'Capacete do Homem de Ferro', quantity: 40 });
      expect(res).to.be.includes.keys('id', 'name', 'quantity');
    })
  });
}); 