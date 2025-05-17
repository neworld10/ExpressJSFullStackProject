const express = require('express');
const postController = require('../controller/postController.js');

const router = express.Router();

router.get('/posts', postController.getPosts);
router.get('/posts/:post_id', postController.getPost);
router.post('/posts', postController.writePost);
router.patch('/posts/:post_id', postController.updatePost);
router.delete('/posts/:post_id', postController.softDeletePost);

module.exports = router;