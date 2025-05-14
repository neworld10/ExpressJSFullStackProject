// const express = require('express');
// const postController = require('../controller/postController.js');
import express from 'express';
import postController from '../controller/postController.js';

const router = express.Router();

// 모든 게시글을 가져오는 라우트
router.get('/posts', postController.getPosts);

// ID로 특정 게시글을 가져오는 라우트
router.get('/posts/:post_id', postController.getPost);

// 게시글을 추가하는 라우트
router.post('/posts', postController.addPost);

// 게시글을 수정하는 라우트
router.patch('/posts/:post_id', postController.updatePost);

// 게시글을 삭제하는 라우트
router.delete('/posts/:post_id', postController.deletePost);

export default router;