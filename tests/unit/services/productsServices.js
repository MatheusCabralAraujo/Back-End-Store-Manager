const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");

describe('Buscando todos os produtos', () => {
  describe('Quando existem produtos', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
    ];

    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(products);
    })

    after(() => {
      productsModel.getAll.restore();
    })

    it('O retorno deve estar dentro de um array', async () => {
      const res = await productsService.getAll();
      expect(res).to.be.an('array');
    })

    it('O conteúdo do array deve vir corretamente', async () => {
      const [res] = await productsService.getAll();
      expect(res).to.be.includes.all.keys('id', 'name', 'quantity');
    })
  });
});

describe('Buscando apenas 1 produto', () => {
  describe('Quando o produto existe', () => {
    const product = { id: 1, name: 'Martelo de Thor', quantity: 10 };

    before(() => {
      sinon.stub(productsModel, 'getById').resolves([product]);
    })

    after(() => {
      productsModel.getById.restore();
    })

    it('O retorno deve estar dentro de um array', async () => {
      const res = await productsService.getAll();
      expect(res).to.be.an('array');
    })


    it('Deve haver um objeto dentro do array', async () => {
      const res = await productsService.getById(1);
      expect(res[0]).to.be.an('object');
    })

    it('O retorno do objeto deve vir corretamente', async () => {
      const res = await productsService.getById(1);
      expect(res[0]).to.be.includes.keys('id', 'name');
    })
  });
});

describe('Criando 1 produto novo', () => {
  describe('Quando o produto é criado', () => {
    const product = { id: 4, name: 'Capacete do Homem de Ferro'};

    before(() => {
      sinon.stub(productsModel, 'createProduct').resolves(product);
    })

    after(() => {
      productsModel.createProduct.restore();
    })

    it('O retorno deve ser um objeto', async () => {
      const res = await productsService.createProduct('Capacete do Homem de Ferro');
      expect(res).to.be.an('object');
    })

    it('O retorno do objeto deve vir corretamente', async () => {
      const res = await productsService.createProduct('Capacete do Homem de Ferro');
      expect(res).to.be.includes.keys('id', 'name');
    })
  });
}); 