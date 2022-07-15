const { expect } = require('chai');
const sinon = require('sinon');
const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesService");

describe('Buscando todas as vendas', () => {
  describe('Quando existem vendas', () => {
    const req = {};
    const res = {};
    const sales =  [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(sales);
    })

    after(() => {
      salesService.getAll.restore();
    })

    it('O status code é 200', async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('O json retornado deve estar dentro de um array', async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

    it('O json retorna os produtos corretamente', async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith(sales)).to.be.equal(true);
    })

  })
}) 