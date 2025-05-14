// const express = require('express');
import express from 'express';
// const commentController = require('../controller/commentController.js');
import commentController from '../controller/commentController.js';

const router = express.Router();

// 모든 댓글을 가져오는 라우트
router.get('/comments', commentController.getComments);

// ID로 특정 댓글을 가져오는 라우트
router.get('/comments/:comment_id', commentController.getComment);

// 댓글을 추가하는 라우트
router.post('/comments', commentController.addComment);

// 댓글을 수정하는 라우트
router.patch('/comments/:comment_id', commentController.updateComment);

// 댓글을 삭제하는 라우트
router.delete('/comments/:comment_id', commentController.deleteComment);

export default router;
// module.exports = router;