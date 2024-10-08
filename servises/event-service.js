const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const eventModel = require('../models/event-model');

class EventService {
  async getEvents(filter, page = 1, limit = 10) {
    const query = {};

    // Если были переданы eventTypes, добавляем фильтр
    if (filter.eventTypes && filter.eventTypes.length > 0) {
      query.eventTypes = { $in: filter.eventTypes };
    }

    // Вычисляем количество пропускаемых событий (для пагинации)
    const skip = (page - 1) * limit;

    // Получаем отфильтрованные события с учетом пагинации
    const events = await eventModel.find(query).skip(skip).limit(limit);

    // Также получаем общее количество событий для подсчета страниц
    const totalEvents = await eventModel.countDocuments(query);

    return {
      events,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: page,
    };
  }

  async getEvent(eventId) {
    const event = await eventModel
      .findById(eventId)
      .populate('comments') // Подгружаем комментарии
      .populate('creator', ['firstname', 'lastname']);

    if (!event) {
      throw ApiError.BadRequest('Event not found');
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
    const event = await eventModel.findByIdAndUpdate(eventId, data, { new: true });
    if (!event) {
      throw ApiError.BadRequest('Event not found');
    }
    return event;
  }
  async deleteEvent(eventId) {
    const deletedEvent = await eventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      throw ApiError.BadRequest('Event not found');
    }
    return deletedEvent;
  }
}

module.exports = new EventService();
