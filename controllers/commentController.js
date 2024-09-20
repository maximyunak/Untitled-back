const commentService = require('../servises/comment-service');

class CommentController {
  async createComment(req, res, next) {
    try {
      const eventId = req.params.eventId;
      const { email, commentBody } = req.body;

      const comment = await commentService.createComment(eventId, email, commentBody);

      res.json(comment);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;

      const comment = await commentService.deleteComment(commentId);

      res.json(comment);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getComments(req, res, next) {
    try {
      const { eventId } = req.params;
      const { page = 1, limit = 10 } = req.query; // Получаем параметры пагинации

      const comments = await commentService.getComments(eventId, page, limit);

      res.json(comments);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async updateComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const { commentBody } = req.body;

      const comment = await commentService.updateComment(commentId, commentBody);

      res.json(comment);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
}

module.exports = new CommentController();
