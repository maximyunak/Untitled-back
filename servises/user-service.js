const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const eventModel = require("../models/event-model");
const tokenService = require("./token-service");

class UserService {
  async registration(
    email,
    password,
    country,
    firstname,
    lastname,
    dateOfBirth,
    preferences
  ) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const hash = await bcrypt.hash(password, 9);
    //   const activationLink = uuid.v4();
    const user = await userModel.create({
      email,
      password: hash,
      country, // Добавлено country
      firstname, // Добавлено firstname
      lastname, // Добавлено lastname
      dateOfBirth, // Добавлено dateOfBirth
      preferences, // Добавлено preferences
    });
    //   await mailServise.sendActivationMail(
    //     email,
    //     `${process.env.API_URL}/api/activate/${activationLink}`,
    //   );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    return tokens;
  }

  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }
}

module.exports = new UserService();
