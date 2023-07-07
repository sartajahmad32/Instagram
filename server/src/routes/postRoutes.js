const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/postController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });



// Create a post
router.post('/api/posts', upload.single('image'), postController.createPost);

// Like a post
router.post('/api/posts/:postId/like', postController.likePost);

// Like a comment
router.post('/api/posts/:postId/comments/:commentIndex/like', postController.likeComment);

// Delete a comment
router.delete('/api/posts/:postId/comments/:commentIndex', postController.deleteComment);

// Edit a comment
router.put('/api/posts/:postId/comments/:commentIndex', postController.editComment);

module.exports = router;
