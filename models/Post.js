const mongoose = require('mongoose');

// Define the schema for a blog post
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Post model from the schema
const Post = mongoose.model('Post', PostSchema);

// Export the Post model
module.exports = Post;
