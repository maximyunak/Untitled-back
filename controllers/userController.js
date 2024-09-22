const { sendError } = require("../exceptions/sendError");
const userModel = require("../models/user-model");
const tokenService = require("../servises/token-service");
const userService = require("../servises/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const {
        email,
        password,
        country,
        firstname,
        lastname,
        dateOfBirth,
        preferences,
      } = req.body;
      const userData = await userService.registration(
        email,
        password,
        country,
        firstname,
        lastname,
        dateOfBirth,
        preferences
      );

      return res.json(userData);
    } catch (error) {
      // Вернуть ошибку в формате JSON
      sendError(res, error);
    }
  }

  async getUser(req, res, next) {
    try {
      const authHeader = req.headers.authorization; // Получаем заголовок Authorization
      if (!authHeader) {
        throw new Error("Authorization header is missing");
      }

      const token = authHeader.split(" ")[1];
      const data = tokenService.validateAccessToken(token);

      res.json(data);
    } catch (error) {
      sendError(res, error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.json(userData);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      res.json("ok");
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
