import { getServerUrl, getCookie } from '../utils/function.js';

export const userModify = async (userId, changeData) => {
    const result = await fetch(`${getServerUrl()}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userId: userId,
        },
        body: JSON.stringify(changeData),
    });
    return result;
};

export const userDelete = async userId => {
    const result = await fetch(`${getServerUrl()}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userId: userId,
        },
    });
    return result;
};
