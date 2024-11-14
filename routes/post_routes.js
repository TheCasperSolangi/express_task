const express = require('express');
const { addPost, retrievePost, editPost, deletePost, getNearbyPosts } = require('../controllers/post_controller');
const authMiddleware = require('../middleware/jwtMiddleware');
const router = express.Router();

router.post('/post/add', authMiddleware, addPost); // Add new post
router.get('/post/:username', authMiddleware, retrievePost); // Retrieve posts by username
router.put('/post/edit', authMiddleware, editPost); // Edit a post
router.delete('/post/:postId/delete', authMiddleware, deletePost); // Delete a post
router.get('/post/fetch/all', authMiddleware, getNearbyPosts); // Fetches the posts by latitude and longitude
module.exports = router;