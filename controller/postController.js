// Dummy data, JSON 구조
const posts = [
    { postId: 1, postTitle: 'First post', postContent: 'postContent of the first post' },
    { postId: 2, postTitle: 'Second post', postContent: 'postContent of the second post' },
    { postId: 3, postTitle: 'Third post', postContent: 'postContent of the third post' },
];

// 모든 게시글 불러오기
const getPosts = (request, response) => {
    try {
        return response.status(200).json({
            status: 200,
            message: null,
            data: posts,
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

// 특정 게시물 불러오기
const getPost = (request, response) => {
    try {
        const postId = parseInt(request.params.post_id);
        const post = posts.find(post => post.postId === postId);
        if (!post) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_post',
                data: null,
            });
        }

        return response.status(200).json({
            status: 200,
            message: null,
            data: post,
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

// 게시글 작성
const addPost = (request, response) => {
    try {
        const newPost = {
            postId: posts.length + 1,
            postTitle: request.body.postTitle,
            postContent: request.body.postContent,
        };
        posts.push(newPost);

        return response.status(201).json({
            status: 201,
            message: 'create_post_success',
            data: newPost,
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

// 게시글 수정
const updatePost = (request, response) => {
    try {
        const post = posts.find(
            post => post.postId === parseInt(request.params.post_id),
        );
        if (!post) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_post',
                data: null,
            });
        }
        post.postTitle = request.body.postTitle;
        post.postContent = request.body.postContent;

        return response.status(200).json({
            status: 200,
            message: 'update_post_success',
            data: post,
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

// 포스트를 삭제하는 함수입니다.
const deletePost = (request, response) => {
    try {
        const postIndex = posts.findIndex(
            post => post.postId === parseInt(request.params.post_id),
        );
        if (postIndex === -1) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_post',
                data: null,
            });
        }
        posts.splice(postIndex, 1);
        return response.status(200).json({
            status: 200,
            message: 'delete_post_success',
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
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
};