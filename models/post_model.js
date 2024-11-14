const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postId: { type: Number, unique: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  post_body: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);