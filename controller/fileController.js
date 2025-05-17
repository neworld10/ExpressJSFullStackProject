const {
    STATUS_CODE,
    STATUS_MESSAGE
} = require('../util/constant/httpStatusCode');

exports.uploadFile = (request, response, next) => {
    try {
        if (!request.file) {
            const error = new Error(STATUS_MESSAGE.INVALID_FILE);
            error.status = STATUS_CODE.BAD_REQUEST;
            throw error;
        }

        response.status(STATUS_CODE.CREATED).send({
            message: STATUS_MESSAGE.FILE_UPLOAD_SUCCESS,
            data: {
                filePath: `/public/image/profile/${request.file.filename}`
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.uploadPostFile = (request, response, next) => {
    try {
        if (!request.file) {
            const error = new Error(STATUS_MESSAGE.INVALID_FILE);
            error.status = STATUS_CODE.BAD_REQUEST;
            throw error;
        }

        response.status(STATUS_CODE.CREATED).send({
            message: STATUS_MESSAGE.FILE_UPLOAD_SUCCESS,
            data: {
                filePath: `/public/image/post/${request.file.filename}`
            }
        });
    } catch (error) {
        return next(error);
    }
};