const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel')

describe('SALES SERVICE - Testa a função getAll de salesService', () => {
  describe('quando não existe nenhuma venda', () => {

    const responseGetAll = []

    before (() => {
      sinon.stub(salesModel, 'getAll').resolves(responseGetAll);
    });

    after(() => {
      salesModel.getAll.restore();
    });
    it('retorna um array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.empty;
    });
  })

  describe('quando existem vendas no banco de dados', () => {

    const responseGetAll = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ]

    before (() => {
      sinon.stub(salesModel, 'getAll').resolves(responseGetAll);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const [response] = await salesService.getAll();

      expect(response).to.be.an('object')
    });

    it('o objeto contem os atributos: saleId, date, productId, quantity', async () => {
      const [response] = await salesService.getAll();

      expect(response).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      )
    });
  })

})