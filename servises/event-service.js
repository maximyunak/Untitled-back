const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const eventModel = require("../models/event-model");
const tokenService = require("./token-service");

class EventService {
  async getEvents(filter, page = 1, limit = 10, userData) {
    const query = {};

    // Если были переданы eventTypes, добавляем фильтр
    if (filter.eventTypes && filter.eventTypes.length > 0) {
      query.eventTypes = { $in: filter.eventTypes };
    }

    // Если передана страна, добавляем фильтр по country
    if (filter.countries && filter.countries.length > 0) {
      query.country = { $in: filter.countries };
    }

    // Если передан title, добавляем фильтр по title
    if (filter.title) {
      query.title = { $regex: filter.title, $options: "i" }; // Ищем по частичному совпадению без учета регистра
    }

    const user = await userModel.findById(userData.id);
    const savedEventIds = user.saved;

    // Вычисляем количество пропускаемых событий (для пагинации)
    const skip = (page - 1) * limit;

    // Получаем отфильтрованные события с учетом пагинации
    const events = await eventModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .lean()
      .then((events) => {
        return events.map((event) => {
          // Проверяем, есть ли ID события в массиве сохраненных событий
          event.saved = savedEventIds.includes(event._id.toString());
          return event;
        });
      });
    // .populate('comments') // Подгружаем комментарии
    // .populate('creator', ['firstname', 'lastname']);
    console.log(events);

    // Также получаем общее количество событий для подсчета страниц
    const totalEvents = await eventModel.countDocuments(query);

    return {
      events,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: page,
    };
  }

  async getMyEvents(token) {
    const user = tokenService.validateAccessToken(token);
    console.log(user);

    if (!user) {
      return null; // Or throw an error if token is invalid
    }

    const events = await eventModel.find({
      creator: {
        $in: await userModel.find({ email: user.email }).select("_id"),
      },
    });
    return events;
  }

  async getEvent(eventId) {
    const event = await eventModel
      .findById(eventId)
      .populate("comments") // Подгружаем комментарии
      .populate("creator", ["firstname", "lastname"]);

    if (!event) {
      throw ApiError.BadRequest("Event not found");
    }

    return event;
  }

  async createEvents(data) {
    const email = data.email;
    const user = await userModel.findOne({ email });

    const event = await eventModel.create({
      ...data,
      creator: user,
    });
    return event;
  }

  async editEvent(eventId, data) {
    const event = await eventModel.findByIdAndUpdate(eventId, data, {
      new: true,
    });
    if (!event) {
      throw ApiError.BadRequest("Event not found");
    }
    return event;
  }
  async deleteEvent(eventId) {
    const deletedEvent = await eventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      throw ApiError.BadRequest("Event not found");
    }
    return deletedEvent;
  }

  async saveEvent(eventId, userData) {
    const user = await userModel.findById(userData.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Добавляем eventId в массив saved
    if (!user.saved.includes(eventId)) {
      // Проверка, что событие не добавлено ранее
      user.saved.push(eventId);
    }

    // Сохраняем изменения пользователя
    await user.save();
    return user;
  }

  async getSaved(userData) {
    const user = await userModel.findById(userData.id);
    const savedIds = user.saved; // Предполагается, что это массив

    const savedEvents = await eventModel.find({ _id: { $in: savedIds } });
    return savedEvents; // Теперь вы получите массив событий
  }
}

module.exports = new EventService();
