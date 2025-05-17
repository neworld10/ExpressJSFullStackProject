const { STATUS_CODE, STATUS_MESSAGE } = require('./constant/httpStatusCode');

const errorHandler = (error, request, response, next) => {
    if (response.headersSent) {
        return next(error);
    }

    if (request.timedout) {
        console.error('Request timed out:', request.originalUrl); // 타임아웃 발생 시 로그 출력
        return response.status(STATUS_CODE.SERVER_TIMEOUT).send({
            error: {
                message: STATUS_MESSAGE.REQUEST_TIMEOUT,
                data: null
            }
        });
    }

    response.status(error.status || STATUS_CODE.INTERNAL_SERVER_ERROR).send({
        error: {
            message: error.message || STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
            data: null
        }
    });
};

module.exports = { errorHandler };