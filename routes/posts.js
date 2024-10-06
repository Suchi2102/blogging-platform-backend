const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
    const { author, createdAt, page = 1, limit = 10 } = req.query; // Extract query parameters
    const filter = {};

    if (author) {
        filter.author = author; // Filter by author if provided
    }
    if (createdAt) {
        filter.createdAt = { $gte: new Date(createdAt) }; // Filter by creation date
    }

    try {
        const totalPosts = await Post.countDocuments(filter); // Get the total number of posts
        const totalPages = Math.ceil(totalPosts / limit); // Calculate total pages
        const skip = (page - 1) * limit; // Calculate number of documents to skip

        const posts = await Post.find(filter).limit(Number(limit)).skip(skip); // Fetch posts with pagination
        res.json({
            totalPosts,
            totalPages,
            currentPage: Number(page),
            posts
        }); // Return posts along with pagination info
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.author = req.body.author || post.author;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
// Inside routes/posts.js
router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' }); // Handle case where post doesn't exist
      }
      res.status(204).send(); // No content status
    } catch (err) {
      res.status(500).json({ message: err.message }); // Internal server error
    }
  });
  

module.exports = router;
