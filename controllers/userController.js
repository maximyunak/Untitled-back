const userModel = require('../models/user-model');
const userService = require('../servises/user-service');

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, country, firstname, lastname, dateOfBirth, preferences } = req.body;
      const userData = await userService.registration(
        email,
        password,
        country,
        firstname,
        lastname,
        dateOfBirth,
        preferences,
      );

      return res.json(userData);
    } catch (error) {
      next(error);
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
