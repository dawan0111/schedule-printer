const { authResponse } = require('../utils/response')
const { decodeToken } = require('../utils/auth');
const models = require('../models')

const authMiddleware = (req, res, next) => {
  const responseFail = authResponse(null, 'auth error');

  if (req.headers.authorization) {
    const jwtToken = req.headers.authorization.split('Bearer ')[1];
    decodeToken(jwtToken, (err, userInfo) => {
      if (!err) {
        req.body.userInfo = userInfo;
        next();
      } else {
        res.status(401).json(responseFail);
      }  
    });
  } else {
    res.status(401).json(responseFail)
  }
}

const authAdminMiddleware = (req, res, next) => {
  const userInfo = req.body.userInfo.data;
  if (userInfo.userId) {
      models["Admins"].findOne({
        where: {
          userId: userInfo.userId
        },
        raw: true
      }).then((user) => {
        if (user) {
          next();
        } else {
          res.status(401).json(authResponse(null, 'auth error'))      
        }
      })
  } else {
    res.status(401).json(authResponse(null, 'auth error'))
  }
}

module.exports = {
  authMiddleware,
  authAdminMiddleware: [authMiddleware, authAdminMiddleware]
}