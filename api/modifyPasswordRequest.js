import { getServerUrl, getCookie } from '../utils/function.js';

export const changePassword = async (userId, password) => {
    const result = fetch(`${getServerUrl()}/users/${userId}/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userId: userId,
        },
        body: JSON.stringify({
            password,
        }),
    });
    return result;
};
