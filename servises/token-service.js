const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");
// const tokenModel = require('../models/token-model');

class tokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10d",
    });
    return {
      accessToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      throw ApiError.BadRequest("Incorrect token");
    }
  }
}

module.exports = new tokenService();
