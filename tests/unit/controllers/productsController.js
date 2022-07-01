const sinon = require("sinon");
const { expect } = require("chai");
const productsController = require('../../../controllers/productController');
const productsService = require('../../../services/productsService');

describe('Buscando todos os produtos', () => {
  describe('Quando existem produtos', () => {
    const res = {};
    const req = {};
    const products = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
    ];

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(products);
    })

    after(() => {
      productsService.getAll.restore();
    })

    it('O status code é 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('O json retornado deve estar dentro de um array', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

    it('O json retorna os produtos corretamente', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith(products)).to.be.equal(true);
    })
  });
});

describe('Buscando apenas 1 produto', () => {
  describe('Quando o produto existe', () => {
    const req = { params: 1 };
    const res = {};
    const product = { id: 1, name: 'Martelo de Thor', quantity: 10 };

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves(product);
    })

    after(() => {
      productsService.findById.restore();
    })

    it('O status code é 200', async () => {
      await productsController.findById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('O json retornado deve estar dentro de um objeto', async () => {
        await productsController.findById(req, res);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

    it('O json retorna os produtos corretamente', async () => {
        await productsController.findById(req, res);
      expect(res.json.calledWith(product)).to.be.equal(true);
    })
  });
});

describe('Criando 1 produto novo', () => {
  describe('Quando o produto é criado', () => {
    const req = {};
    const res = {};
    const product = { id: 1, name: 'Martelo de Thor', quantity: 10 };

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      req.body = product;

      sinon.stub(productsService, 'createProduct').resolves(product);
    })

    after(() => {
      productsService.createProduct.restore();
    })

    it('O status code é 201', async () => {
      await productsController.createProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    })

    it('O json retornado deve estar dentro de um objeto', async () => {
      await productsController.createProduct(req, res);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

    it('O json retorna os produtos corretamente', async () => {
      await productsController.createProduct(req, res);
      expect(res.json.calledWith(product)).to.be.equal(true);
    })
  });
}); 