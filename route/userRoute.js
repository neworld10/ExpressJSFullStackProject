// const express = require('express');
// const userController = require('../controller/userController.js');
import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

// 모든 사용자를 가져오는 라우트
router.get('/users', userController.getUsers);

// ID로 특정 사용자를 가져오는 라우트
router.get('/users/:user_id', userController.getUser);

// 사용자를 추가하는 라우트
router.post('/users', userController.addUser);

// 사용자 정보를 수정하는 라우트
router.patch('/users/:user_id', userController.updateUser);

// 사용자를 삭제하는 라우트
router.delete('/users/:user_id', userController.deleteUser);

export default router;