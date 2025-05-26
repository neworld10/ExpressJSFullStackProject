const express = require('express');
const commentController = require('../controller/commentController.js');
const router = express.Router();
const isLoggedIn = require('../util/authUtil.js');

router.get(
    '/posts/:post_id/comments',
    commentController.getComments,
    isLoggedIn,
);
router.post(
    '/posts/:post_id/comments',
    commentController.writeComment,
    isLoggedIn,
);
router.patch(
    '/posts/:post_id/comments/:comment_id',
    isLoggedIn,
    commentController.updateComment,
);
router.delete(
    '/posts/:post_id/comments/:comment_id',
    isLoggedIn,
    commentController.softDeleteComment,
);

module.exports = router;