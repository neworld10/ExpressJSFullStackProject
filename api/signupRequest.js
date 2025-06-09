import { getServerUrl } from '../utils/function.js';

export const userSignup = async data => {
    const result = await fetch(`${getServerUrl()}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return result;
};

export const checkEmail = async email => {
    const result = await fetch(
        `${getServerUrl()}/users/email/check?email=${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    return result;
};

export const checkNickname = async nickname => {
    const result = await fetch(
        `${getServerUrl()}/users/nickname/check?nickname=${nickname}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    return result;
};

export const fileUpload = async file => {
    const result = await fetch(`${getServerUrl()}/users/upload/profile-image`, {
        method: 'POST',
        body: file,
    });
    return result;
};