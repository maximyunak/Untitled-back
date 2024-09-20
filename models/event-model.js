const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
  country: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventTypes: { type: [String] },
  creator: {
    // Поле для ссылки на создателя
    type: Schema.Types.ObjectId,
    ref: 'User', // Ссылка на модель User
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment', // Массив ссылок на комментарии
    },
  ],
});

module.exports = model('Event', EventSchema);
