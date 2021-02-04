const moment = require('moment')
const Sequelize = require('sequelize')
const models = require('../models')
const { successResponse, failResponse } = require('../utils/response')

module.exports = {

  async get(req, res) {
    if (req.params.printerId) {
      const historys = await models["Historys"].findAll({
        where: {
          printerId: req.params.printerId
        },
        order: [["startDate", "DESC"]],
      })
      
      res.json(successResponse({
        historys
      }, "프린터 사용내역"))
    } else {
      res
        .status(400)
        .json(failResponse(null, "존재하지 않는 프린터 입니다."))
    }
  },

  async ranking(req, res) {
    const historys = await models["Historys"].findAll({
      attributes: [
        Sequelize.col('Historys.userId'),
        [Sequelize.col('User.name'), 'userName'],
        [Sequelize.fn('count', Sequelize.col('Historys.id')), 'count']
      ],
      group: [
        Sequelize.col("Historys.userId"),
        'User.id'
      ],
      include: [ 
        {
          attributes: [],
          model: models["Users"],
          required: true,
        }
      ],
      order: [["count", "DESC"]],
      raw: true
    })

    res.json(successResponse({
      historys
    }, "3D프린터 사용 랭킹"))
  },

  async create(req, res) {
    const { userId } = req.body.userInfo.data
    const { printerId, name, phone, outputHour, outputMinute } = req.body;
    const startDate = new Date()
    const endDate = moment().add(outputHour * 60 + outputMinute, 'minutes').toDate()

    const userInfo = await models["Users"].findOne({
      where: {
        userId
      },
    })

    if (userInfo) {
      await userInfo.update({
        name,
        phone
      })
    } else {
      await models["Users"].create({
        userId,
        name,
        phone
      })
    }

    const history = await models["Historys"].create({
      userId,
      printerId,
      userName: name,
      userPhone: phone,
      startDate,
      endDate,
    })

    res.json(successResponse({
      history
    }, "3D프린터 예약 성공"))
  }
}