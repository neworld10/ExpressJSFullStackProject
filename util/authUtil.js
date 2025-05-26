const dbConnect = require('../database/index.js');
const { STATUS_CODE, STATUS_MESSAGE } = require('./constant/httpStatusCode');

const isLoggedIn = async (req, res, next) => {
    const { session } = req.headers;
    const userId =
        req.headers.userid && !Number.isNaN(req.headers.userid)
            ? parseInt(req.headers.userid, 10)
            : null;

    try {
        if (!userId) {
            const error = new Error(STATUS_MESSAGE.REQUIRED_AUTHORIZATION);
            error.status = STATUS_CODE.UNAUTHORIZED;
            return next(error);
        }

        const userSessionData = await dbConnect.query(
            `SELECT session_id FROM user_table WHERE user_id = ?;`,
            [userId],
            res
        );

        if (
            !userSessionData ||
            userSessionData.length === 0 ||
            session !== userSessionData[0].session_id
        ) {
            const error = new Error(STATUS_MESSAGE.REQUIRED_AUTHORIZATION);
            error.status = STATUS_CODE.UNAUTHORIZED;
            return next(error);
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = isLoggedIn;