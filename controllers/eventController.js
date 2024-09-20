const userModel = require('../models/user-model');
const eventService = require('../servises/event-service');
const userService = require('../servises/user-service');

class EventController {
  async getEvents(req, res, next) {
    try {
      // Получаем параметры пагинации и фильтрации из запроса
      const eventTypes = req.query.eventTypes ? req.query.eventTypes.split(',') : [];
      const page = parseInt(req.query.page, 10) || 1; // Текущая страница (по умолчанию 1)
      const limit = parseInt(req.query.limit, 10) || 10; // Лимит на количество элементов (по умолчанию 10)

      // Вызываем метод сервиса с фильтрами и пагинацией
      const result = await eventService.getEvents({ eventTypes }, page, limit);

      // Возвращаем данные и информацию о пагинации
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error fetching events' });
    }
  }

  async getEvent(req, res, next) {
    try {
      const eventId = req.params.id;
      const event = await eventService.getEvent(eventId);
      res.json(event);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async createEvent(req, res, next) {
    try {
      const data = req.body;
      const eventData = await eventService.createEvents(data);
      res.json(eventData);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }

  async editEvent(req, res, next) {
    try {
      const eventId = req.params.id; // предположим, что ID передается через параметры маршрута
      const data = req.body;
      const updatedEvent = await eventService.editEvent(eventId, data);
      res.json(updatedEvent);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }

  async deleteEvent(req, res, next) {
    try {
      const eventId = req.params.id;
      const deletedEvent = await eventService.deleteEvent(eventId);
      res.json(deletedEvent); // Возвращаем удалённое событие
    } catch (error) {
      console.log(error);
      next(error); // Обрабатываем ошибку через middleware
    }
  }
}

module.exports = new EventController();
