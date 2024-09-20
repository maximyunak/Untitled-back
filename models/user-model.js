const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dateOfBirth: { type: String },
  preferences: { type: [String] },

  // isActivated: { type: Boolean, default: false },
  // activationLink: { type: String },
});

module.exports = model('User', UserSchema);
