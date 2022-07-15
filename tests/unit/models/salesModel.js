const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel')

describe('SALES MODEL - Testa a função getAll de salesModel', () => {
  describe('quando não existe nenhuma venda', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.empty;
    });

  })

  describe('quando existem vendas no banco de dados', () => {

    const resultExecute = [[
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ]]

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const [result] = await salesModel.getAll();

      expect(result).to.be.an('object')
    });

    it('o objeto contem os atributos: saleId, date, productId, quantity', async () => {
      const [result] = await salesModel.getAll();

      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      )
    });
  }); 
})