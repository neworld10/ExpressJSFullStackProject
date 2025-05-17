const postModel = require('../model/postModel.js');
const {
    STATUS_CODE,
    STATUS_MESSAGE
} = require('../util/constant/httpStatusCode');

/**
 * 게시글 작성
 * 게시글 목록 조회
 * 게시글 상세 조회
 * 게시글 수정
 * 게시글 삭제
 */

// 게시글 작성
exports.writePost = async (request, response, next) => {
    const { userid: userId } = request.query;
    const { postTitle, postContent, attachFilePath } = request.body;

    try {
        if (!postTitle) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_TITLE);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		
		    if (postTitle.length > 26) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_TITLE_LENGTH);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		
		    if (!postContent) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_CONTENT);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		
		    if (postContent.length > 1500) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_CONTENT_LENGHT);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = {
            userId,
            postTitle,
            postContent,
            attachFilePath: attachFilePath || null
        };
        const responseData = await postModel.writePost(requestData);

        if (responseData === STATUS_MESSAGE.NOT_FOUND_USER) {
            const error = new Error(STATUS_MESSAGE.NOT_FOUND_USER);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        if (!responseData) {
            const error = new Error(STATUS_MESSAGE.WRITE_POST_FAILED);
            error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            throw error;
        }

        return response.status(STATUS_CODE.CREATED).json({
            message: STATUS_MESSAGE.WRITE_POST_SUCCESS,
            data: responseData
        });
    } catch (error) {
        next(error);
    }
};

// 게시글 목록 조회
exports.getPosts = async (request, response, next) => {
    try {
        const responseData = await postModel.getPosts();

        if (!responseData || responseData.length === 0) {
            const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        return response.status(STATUS_CODE.OK).json({
            message: STATUS_MESSAGE.GET_POSTS_SUCCESS,
            data: responseData
        });
    } catch (error) {
        next(error);
    }
};

// 게시글 상세 조회
exports.getPost = async (request, response, next) => {
    const { post_id: postId } = request.params;

    try {
        if (!postId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = {
            postId
        };
        const responseData = await postModel.getPost(requestData, response);

        if (!responseData) {
            const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        return response.status(STATUS_CODE.OK).json({
            message: null,
            data: responseData
        });
    } catch (error) {
        next(error);
    }
};

// 게시글 수정
exports.updatePost = async (request, response, next) => {
    const { post_id: postId } = request.params;
    const { userid: userId } = request.query;
    const { postTitle, postContent, attachFilePath } = request.body;

    try {
        if (!postId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
		
		    if (postTitle.length > 26) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_TITLE_LENGTH);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = {
            postId,
            userId,
            postTitle,
            postContent,
            attachFilePath: attachFilePath || null
        };
        const responseData = await postModel.updatePost(requestData);

        if (!responseData) {
            const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        return response.status(STATUS_CODE.OK).json({
            message: STATUS_MESSAGE.UPDATE_POST_SUCCESS,
            data: responseData
        });
    } catch (error) {
        next(error);
    }
};

// 게시글 삭제
exports.softDeletePost = async (request, response, next) => {
    const { post_id: postId } = request.params;

    try {
        if (!postId) {
		        const error = new Error(STATUS_MESSAGE.INVALID_POST_ID);
		        error.status = STATUS_CODE.BAD_REQUEST;
		        throw error;
		    }
    
        const requestData = {
            postId
        };
        const results = await postModel.softDeletePost(requestData);

        if (!results) {
            const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        return response.status(STATUS_CODE.OK).json({
            message: STATUS_MESSAGE.DELETE_POST_SUCCESS,
            data: null
        });
    } catch (error) {
        return next(error);
    }
};
