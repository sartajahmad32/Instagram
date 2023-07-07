const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  image: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String, likes: { type: Number, default: 0 } }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
