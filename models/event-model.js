const { Schema, model } = require("mongoose");

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
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = model("Event", EventSchema);
