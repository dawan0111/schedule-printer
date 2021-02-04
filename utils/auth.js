const jwt = require("jsonwebtoken")
const jwtConfig = require("../configs/jwt")

module.exports = {
  encodeToken (data) {
    const token = jwt.sign({
      data
    }, jwtConfig.screct_key, {
      expiresIn: jwtConfig.expires_in
    })

    return token
  },

  decodeToken (token, callback) {
    jwt.verify(token, jwtConfig.screct_key, callback);
  },
}