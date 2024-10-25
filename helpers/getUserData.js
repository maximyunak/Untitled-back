const tokenService = require("../servises/token-service");

const getUserData = (req) => {
  const authHeader = req.headers.authorization; // Получаем заголовок Authorization
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }
  const token = authHeader.split(" ")[1];

  const userData = tokenService.validateAccessToken(token);

  return userData;
};

module.exports = { getUserData };
