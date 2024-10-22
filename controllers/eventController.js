const userModel = require("../models/user-model");
const eventService = require("../servises/event-service");
const tokenService = require("../servises/token-service");
const userService = require("../servises/user-service");

class EventController {
  async getEvents(req, res, next) {
    try {
      const authHeader = req.headers.authorization; // Получаем заголовок Authorization
      let userData = null;

      if (authHeader) {
        const token = authHeader.split(" ")[1];

        userData = tokenService.validateAccessToken(token); // Пытаемся проверить токен
      }

      const eventTypes = req.query.eventTypes
        ? req.query.eventTypes.split(",")
        : [];
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const title = req.query.title;
      const countries = req.query.countries
        ? req.query.countries.split(",")
        : [];

      // Вызываем метод сервиса с фильтрами и пагинацией
      const result = await eventService.getEvents(
        { eventTypes, title, countries },
        page,
        limit,
        userData
      );

      // Возвращаем данные и информацию о пагинации
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching events" });
    }
  }

  async getMyEvents(req, res, next) {
    try {
      const authHeader = req.headers.authorization; // Получаем заголовок Authorization
      if (!authHeader) {
        throw new Error("Authorization header is missing");
      }
      const token = authHeader.split(" ")[1];
      const events = await eventService.getMyEvents(token);
      res.json(events);
    } catch (error) {
      console.log(error);
      res.json(error);
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
      // res.json('p');
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

  async saveEvent(req, res) {
    try {
      const eventId = req.params.id;
      const authHeader = req.headers.authorization; // Получаем заголовок Authorization
      if (!authHeader) {
        throw new Error("Authorization header is missing");
      }
      const token = authHeader.split(" ")[1];

      const userData = tokenService.validateAccessToken(token);

      const saved = await eventService.saveEvent(eventId, userData);
      res.json(saved);
    } catch (error) {
      console.log(error);
    }
  }

  async getSaved(req, res) {
    try {
      const eventId = req.params.id;
      const authHeader = req.headers.authorization; // Получаем заголовок Authorization
      if (!authHeader) {
        throw new Error("Authorization header is missing");
      }
      const token = authHeader.split(" ")[1];

      const userData = tokenService.validateAccessToken(token);

      const saved = await eventService.getSaved(userData);

      res.json(saved);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new EventController();
