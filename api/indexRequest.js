import { getServerUrl, getCookie } from '../utils/function.js';

export const getPosts = (offset, limit) => {
    const result = fetch(
        `${getServerUrl()}/posts?offset=${offset}&limit=${limit}`,
        {
            headers: {
                session: getCookie('session'),
                userId: getCookie('userId'),
            },
            noCORS: true,
        },
    );
    return result;
};