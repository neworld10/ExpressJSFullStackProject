// Dummy data, JSON 구조
const comments = [
    {
        commentId: 1,
        postId: 1, // 이 댓글이 속한 게시글의 ID
        commentContent: 'Comment content of the first comment',
    },
    {
        commentId: 2,
        postId: 1, // 이 댓글이 속한 게시글의 ID
        commentContent: 'Comment content of the second comment',
    },
    {
        commentId: 3,
        postId: 2, // 이 댓글이 속한 게시글의 ID
        commentContent: 'Comment content of the third comment',
    },
];

// 모든 댓글 불러오기
const getComments = (request, response) => {
    try {
        return response.status(200).json({
            status: 200,
            message: null,
            data: comments,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// 특정 댓글 불러오기
const getComment = (request, response) => {
    try {
        const commentId = parseInt(request.params.comment_id);
        const comment = comments.find(
            comment => comment.commentId === commentId,
        );
        if (!comment) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_comment',
                data: null,
            });
        }

        return response.status(200).json({
            status: 200,
            message: null,
            data: comment,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// 댓글 작성
const addComment = (request, response) => {
    try {
        const newComment = {
            commentId: comments.length + 1,
            postId: request.body.postId,
            commentContent: request.body.commentContent,
        };
        comments.push(newComment);

        return response.status(201).json({
            status: 201,
            message: 'create_comment_success',
            data: newComment,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// 댓글 수정
const updateComment = (request, response) => {
    try {
        const comment = comments.find(
            comment =>
                comment.commentId === parseInt(request.params.comment_id),
        );
        if (!comment) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_comment',
                data: null,
            });
        }
        comment.commentContent = request.body.commentContent;

        return response.status(200).json({
            status: 200,
            message: 'update_comment_success',
            data: comment,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// 댓글 삭제
const deleteComment = (request, response) => {
    try {
        const commentIndex = comments.findIndex(
            comment =>
                comment.commentId === parseInt(request.params.comment_id),
        );
        if (commentIndex === -1) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_comment',
                data: null,
            });
        }
        comments.splice(commentIndex, 1);
        return response.status(200).json({
            status: 200,
            message: 'delete_comment_success',
            data: null,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

export default {
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment
};