const Post = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    const { image } = req.body;

    const newPost = new Post({ image });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.likes += 1;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const likeComment = async (req, res) => {
  try {
    const { postId, commentIndex } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments[commentIndex];
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.likes += 1;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentIndex } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.splice(commentIndex, 1);
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const editComment = async (req, res) => {
  try {
    const { postId, commentIndex } = req.params;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments[commentIndex];
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.text = text;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { createPost, likePost, likeComment, deleteComment, editComment };
