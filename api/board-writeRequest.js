import { getServerUrl, getCookie } from '../utils/function.js';

export const createPost = boardData => {
    const result = fetch(`${getServerUrl()}/posts`, {
        method: 'POST',
        body: JSON.stringify(boardData),
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userId: getCookie('userId'),
        },
    });
    return result;
};

export const updatePost = (postId, boardData) => {
    const result = fetch(`${getServerUrl()}/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(boardData),
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userId: getCookie('userId'),
        },
    });

    return result;
};

export const fileUpload = formData => {
    const result = fetch(getServerUrl() + '/posts/upload/attach-file', {
        method: 'POST',
        body: formData,
    });

    return result;
};

export const getBoardItem = postId => {
    const result = fetch(getServerUrl() + `/posts/${postId}`, {
        method: 'GET',
        headers: {
            session: getCookie('session'),
            userId: getCookie('userId'),
        },
        noCORS: true,
    });

    return result;
};
