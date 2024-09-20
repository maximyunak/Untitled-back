const userModel = require('../models/user-model');
const eventModel = require('../models/event-model');
const commentModel = require('../models/comment-model'); // Импортируем модель комментариев
const ApiError = require('../exceptions/api-error');

class CommentService {
  async createComment(eventId, email, commentBody) {
    const user = await userModel.findOne({ email });
    const event = await eventModel.findById(eventId);

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    if (!event) {
      throw ApiError.BadRequest('Event not found');
    }

    // Создаём комментарий
    const comment = await commentModel.create({
      commentBody,
      email,
      creator: user._id, // Ссылка на создателя (пользователя)
      eventId, // Ссылка на событие
    });

    // Обновляем событие, добавляя новый комментарий
    event.comments.push(comment._id);
    await event.save(); // Сохраняем изменения в событии

    return comment;
  }

  async deleteComment(commentId) {
    const comment = await commentModel.findByIdAndDelete(commentId);
    return comment;
  }

  async getComments(eventId, page = 1, limit = 10) {
    const skip = (page - 1) * limit; // Рассчитываем, сколько комментариев нужно пропустить

    const comments = await commentModel
      .find({ eventId })
      .sort({ createdAt: -1 }) // Сортировка по дате создания (например, по убыванию)
      .skip(skip) // Пропускаем нужное количество комментариев
      .limit(Number(limit)); // Ограничиваем количество комментариев

    const totalComments = await commentModel.countDocuments({ eventId }); // Общее количество комментариев

    return {
      comments,
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: Number(page),
    };
  }

  async updateComment(commentId, commentBody) {
    const comment = await commentModel.findByIdAndUpdate(commentId, { commentBody });
    return comment;
  }
}

module.exports = new CommentService();
