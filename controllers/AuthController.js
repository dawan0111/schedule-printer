const models = require('../models')
const auth = require('../utils/auth')

const { encodeToken } = require('../utils/auth')
const { successResponse, failResponse } = require('../utils/response')

module.exports = {
  async login(req, res) {
    const { userId, password } = req.body
  
    res.json(successResponse({
      "token": encodeToken({
        userId: ""+userId,
        password: ""+password
      })
    }, "로그인이 완료되었습니다."))
  },

  async auth(req, res) {
    const { userId } = req.body.userInfo.data;

    const [userInfo, isAdmin] = await Promise.all([
      models["Users"].findOne({
        where: {
          userId: userId
        },
        raw: true,
      }),
      models["Admins"].findOne({
        where: {
          userId: userId
        },
        raw: true,
      }),
    ])


    res.json(successResponse({
      userId,
      isAdmin: !!isAdmin,
      userInfo: userInfo,
      refreshToken: encodeToken(req.body.userInfo.data)
    }, "인증 되었습니다."))
  },

  async getAdmins(req, res) {
    const admins = await models["Admins"].findAll({
      raw: true,
    });

    console.log(admins)

    res.json(successResponse({
      admins
    } , "관리자 목록을 가졍오는데 성공했습니다."))
  },

  async createAdmin(req, res) {
    const userId = req.body.userId;
    const admin = await models["Admins"].create({
      userId
    })

    res.json(successResponse({
      admin
    }, "관리자가 추가되었습니다."))
  },

  async deleteAdmin(req, res) {
    const loginedUserId = req.body.userInfo.data.userId;
    const userId = req.params.userId;

    if (loginedUserId !== userId) {
      const admin = await models["Admins"].destroy({
        where: {
          userId
        }
      })

      res.json(successResponse({
        admin
      }, "관리자가 삭제되었습니다."))
    } else {
      res.status(400).json(failResponse(null, "자기 자신은 삭제 불가능합니다."))
    }
  }
}