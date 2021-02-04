const Sequelize = require('sequelize')
const models = require('../models')
const { successResponse, failResponse } = require('../utils/response');
const { create } = require('./HistoryController');

module.exports = {
  async get(req, res) {
    let [printers, printerHistorys] = await Promise.all([
      await models["Printer"].findAll({
        raw: true
      }),
      await models["Historys"].findAll({
        attributes: [
          'printerId',
          [Sequelize.fn('max', Sequelize.col('startDate')), 'startDate']
        ],
        group: ['printerId'],
        raw: true
      })
    ]);

    printerHistorys = await models["Historys"].findAll({
      where: {
        [Sequelize.Op.or]: printerHistorys
      },
      raw: true,
    })

    printers = printers.map((printer) => ({
      ...printer,
      latest: printerHistorys.find(x => x.printerId === printer.id) || null
    }))

    res.json(successResponse({
      printers: printers,
    }, "3D프린터 종류"))
  },

  async create(req, res) {
    const printerName = req.body.name || '미정';
    const printer = await models["Printer"].create({
      name: printerName
    })

    res.json(successResponse({
      printer
    }, "3D 프린터 생성 완료"))
  },

  async delete(req, res) {
    const printerId = req.params.printerId;
    const printer = await models["Printer"].destroy({
      where: {
        id: printerId
      }
    })

    res.json(successResponse({
      printer
    }, "3D 프린터 삭제 완료"))
  },

  async update(req, res) {
    const printerId = req.params.printerId;
    const name = req.body.name;

    const printer = await models["Printer"].findOne({
      where: {
        id: printerId
      }
    })

    await printer.update({
      name
    })

    res.json(successResponse({
      printer
    }, "3D 프린터 업데이트 완료"))
  },
}