const bcrypt = require('bcrypt');
const userModel = require('../model/userModel.js');
const {
    validEmail,
    validNickname,
    validPassword,
} = require('../util/validUtil.js');
const {
    STATUS_CODE,
    STATUS_MESSAGE,
} = require('../util/constant/httpStatusCode.js');

const SALT_ROUNDS = 10;

/**
 * 로그인
 * 회원가입
 * 유저 정보 가져오기
 * 로그인 상태 체크
 * 비밀번호 변경
 * 회원 탈퇴
 * 로그아웃
 * 이메일 중복 체크
 * 닉네임 중복 체크
 */

// 로그인
exports.loginUser = async (request, response, next) => {
    const { email, password } = request.body;

    try {
        if (!email) {
		        const error = new Error(STATUS_MESSAGE.REQUIRED_EMAIL);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		
		    if (!password) {
		        const error = new Error(STATUS_MESSAGE.REQUIRED_PASSWORD);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
	    
        const requestData = {
            email,
            password,
        };
        const responseData = await userModel.loginUser(requestData, response);

        if (!responseData || responseData === null) {
            const error = new Error(STATUS_MESSAGE.INVALID_EMAIL_OR_PASSWORD);
            error.status = STATUS_CODE.UNAUTHORIZED;
            throw error;
        }
        return response.status(STATUS_CODE.OK).json({
            message: STATUS_MESSAGE.LOGIN_SUCCESS,
            data: responseData,
        });
    } catch (error) {
        return next(error);
    }
};

// 회원가입
exports.signupUser = async (request, response, next) => {
    const { email, password, nickname, profileImagePath } = request.body;

    try {
        if (!email || !validEmail(email)) {
		        const error = new Error(STATUS_MESSAGE.INVALID_EMAIL);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		    if (!nickname || !validNickname(nickname)) {
		        const error = new Error(STATUS_MESSAGE.INVALID_NICKNAME);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		    if (!password || !validPassword(password)) {
		        const error = new Error(STATUS_MESSAGE.INVALID_PASSWORD);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		    
        const bcrypt = require('bcrypt');

        const reqSignupData = {
            email,
            password: hashedPassword,
            password,
            nickname,
            profileImagePath: profileImagePath || null,
        };

        const resSignupData = await userModel.signUpUser(reqSignupData);

        if (resSignupData === 'already_exist_email') {
            const error = new Error(STATUS_MESSAGE.ALREADY_EXIST_EMAIL);
            error.status = STATUS_CODE.BAD_REQUEST;
            throw error;
        }

        if (resSignupData === null) {
            const error = new Error(STATUS_MESSAGE.SIGNUP_FAILED);
            error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            throw error;
        }

        return response.status(STATUS_CODE.CREATED).json({
            message: STATUS_MESSAGE.SIGNUP_SUCCESS,
            data: resSignupData
        });
    } catch (error) {
        return next(error);
    }
};

// 유저 정보 가져오기
exports.getUser = async (request, response, next) => {
    const { user_id: userId } = request.params;

    try {
		    if (!userId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_USER_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		    
        const requestData = {
            userId,
        };
        const responseData = await userModel.getUser(requestData);

        if (responseData === null) {
            const error = new Error(STATUS_MESSAGE.NOT_FOUND_USER);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        return response.status(200).json({
            message: null,
            data: responseData,
        });
    } catch (error) {
        return next(error);
    }
};

// 회원정보 수정
exports.updateUser = async (request, response, next) => {
    const { user_id: userId } = request.params;
    const { nickname, profileImagePath } = request.body;

    try {
        if (!userId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_USER_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		
		    if (!nickname) {
		        const error = new Error(STATUS_MESSAGE.INVALID_NICKNAME);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = {
            userId,
            nickname,
            profileImagePath,
        };
        const responseData = await userModel.updateUser(requestData);

        if (responseData === null) {
            const error = new Error(STATUS_MESSAGE.NOT_FOUND_USER);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        if (responseData === STATUS_MESSAGE.UPDATE_PROFILE_IMAGE_FAILED) {
            const error = new Error(STATUS_MESSAGE.UPDATE_PROFILE_IMAGE_FAILED);
            error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            throw error;
        }

        return response.status(STATUS_CODE.CREATED).json({
            message: STATUS_MESSAGE.UPDATE_USER_DATA_SUCCESS,
            data: null,
        });
    } catch (error) {
        return next(error);
    }
};

// 로그인 상태 체크
exports.checkAuth = async (request, response, next) => {
    const { userid: userId } = request.query;

    try {
		    if (!userId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_USER_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = {
            userId,
        };

        const userData = await userModel.getUser(requestData);

        if (!userData) {
            const error = new Error(STATUS_MESSAGE.NOT_FOUND_USER);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        if (parseInt(userData.userId, 10) !== parseInt(userId, 10)) {
            const error = new Error(STATUS_MESSAGE.REQUIRED_AUTHORIZATION);
            error.status = STATUS_CODE.UNAUTHORIZED;
            throw error;
        }

        return response.status(STATUS_CODE.OK).json({
            message: null,
            data: {
                userId,
                email: userData.email,
                nickname: userData.nickname,
                profileImagePath: userData.profile_image || null,
                auth_status: true,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// 비밀번호 변경
exports.changePassword = async (request, response, next) => {
    const { user_id: userId } = request.params;
    const { password } = request.body;

    try {
        if (!userId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_USER_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		
		    if (!password || !validPassword(password)) {
		        const error = new Error(STATUS_MESSAGE.INVALID_PASSWORD);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const requestData = {
            userId,
            password: hashedPassword,
        };
        const responseData = await userModel.changePassword(requestData);

        if (!responseData) {
            const error = new Error(STATUS_MESSAGE.NOT_FOUND_USER);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        return response.status(STATUS_CODE.CREATED).json({
            message: STATUS_MESSAGE.CHANGE_USER_PASSWORD_SUCCESS,
            data: null,
        });
    } catch (error) {
        return next(error);
    }
};

// 회원 탈퇴
exports.softDeleteUser = async (request, response, next) => {
    const { user_id: userId } = request.params;

    try {
        if (!userId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_USER_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = {
            userId,
        };
        const responseData = await userModel.softDeleteUser(requestData);

        if (responseData === null) {
            const error = new Error(STATUS_MESSAGE.NOT_FOUND_USER);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        return response.status(STATUS_CODE.OK).json({
            message: STATUS_MESSAGE.DELETE_USER_DATA_SUCCESS,
            data: null,
        });
    } catch (error) {
        return next(error);
    }
};

// 로그아웃
exports.logoutUser = async (request, response, next) => {
    const { userid: userId } = request.headers;

    try {
        return response.status(STATUS_CODE.END).json({
		        message: STATUS_MESSAGE.LOGOUT_SUCCESS,
		        data: null,
        });
    } catch (error) {
        return next(error);
    }
};

// 이메일 중복 체크
exports.checkEmail = async (request, response, next) => {
    const { email } = request.query;

    try {
        if (!email) {
		        const error = new Error(STATUS_MESSAGE.INVALID_EMAIL);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
	    
        const requestData = { email };

        const resData = await userModel.checkEmail(requestData);

        if (resData === null) {
            return response.status(STATUS_CODE.OK).json({
                message: STATUS_MESSAGE.AVAILVABLE_EMAIL,
                data: null,
            });
        }

        const error = new Error(STATUS_MESSAGE.ALREADY_EXIST_EMAIL);
        error.status = STATUS_CODE.BAD_REQUEST;
        throw error;
    } catch (error) {
        return next(error);
    }
};

// 닉네임 중복 체크
exports.checkNickname = async (request, response, next) => {
    const { nickname } = request.query;

    try {
        if (!nickname) {
		        const error = new Error(STATUS_MESSAGE.INVALID_NICKNAME);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = { nickname };

        const responseData = await userModel.checkNickname(requestData);

        if (!responseData) {
            return response.status(STATUS_CODE.OK).json({
                message: STATUS_MESSAGE.AVAILABLE_NICKNAME,
                data: null,
            });
        }

        const error = new Error(STATUS_MESSAGE.ALREADY_EXIST_EMAIL);
        error.status = STATUS_CODE.BAD_REQUEST;
        throw error;
    } catch (error) {
        return next(error);
    }
};
