const express = require('express');
const multerUtil = require('../util/multerUtil.js');
const fileController = require('../controller/fileController.js');

const router = express.Router();

router.post(
    '/users/upload/profile-image',
    multerUtil.uploadProfile.single('profileImage'),
    fileController.uploadFile
);
router.post(
    '/posts/upload/attach-file',
    multerUtil.uploadPost.single('postFile'),
    fileController.uploadPostFile
);

module.exports = router;