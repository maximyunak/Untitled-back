const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  email: { type: String, required: true },
  commentBody: { type: String, required: true },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event', // Связываем с моделью Event
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Связываем с моделью User
  },
});

module.exports = model('Comment', CommentSchema);
