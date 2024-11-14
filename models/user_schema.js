// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: {type:String, required: true},
  last_name: {type:String, required: true},
  lat: {type:String, required: true},
  long: {type:String, required: true},
  resetOtp: { type: Number },
  resetOtpExpires: { type: Date },
});

module.exports = mongoose.model('User', userSchema);