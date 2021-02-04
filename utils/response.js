const SUCCESS = 200
const BAD_REQUEST = 400
const AUTH_ERROR = 401

module.exports = {
  successResponse(data, message) {
    return {
      code: SUCCESS,
      data,
      message
    }
  },

  failResponse(data, message) {
    return {
      code: BAD_REQUEST,
      data,
      message
    }
  },

  authResponse(data, message) {
    return {
      code: AUTH_ERROR,
      data,
      message
    }
  }
}