const express = require('express');
const commentController = require('../controller/commentController.js');
const router = express.Router();

router.get(
    '/posts/:post_id/comments',
    commentController.getComments,
);
router.post(
    '/posts/:post_id/comments',
    commentController.writeComment,
);
router.patch(
    '/posts/:post_id/comments/:comment_id',
    commentController.updateComment,
);
router.delete(
    '/posts/:post_id/comments/:comment_id',
    commentController.softDeleteComment,
);

module.exports = router;