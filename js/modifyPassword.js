import { changePassword } from '../api/modifyPasswordRequest.js';
import Dialog from '../component/dialog/dialog.js';
import Header from '../component/header/header.js';
import {
    authCheck,
    deleteCookie,
    getServerUrl,
    prependChild,
    validPassword,
} from '../utils/function.js';

const button = document.querySelector('#signupBtn');

const DEFAULT_PROFILE_IMAGE = '../public/image/profile/default.jpg';
const HTTP_CREATED = 201;

const dataResponse = await authCheck();
const data = await dataResponse.json();
const userId = data.data.userId;
const profileImage =
    data.data.profileImagePath === undefined || data.data.profileImagePath === null
        ? DEFAULT_PROFILE_IMAGE
        : `${getServerUrl()}${data.data.profileImagePath}`;

const modifyData = {
    password: '',
    passwordCheck: '',
};

const observeData = () => {
    const { password, passwordCheck } = modifyData;

    // id, pw, pwck, nickname, profile 값이 모두 존재하는지 확인
    if (!password || !passwordCheck || password !== passwordCheck) {
        button.disabled = true;
        button.style.backgroundColor = '#ACA0EB';
    } else {
        button.disabled = false;
        button.style.backgroundColor = '#7F6AEE';
    }
};

const blurEventHandler = async (event, uid) => {
    if (uid == 'pw') {
        const value = event.target.value;
        const isValidPassword = validPassword(value);
        const helperElement = document.querySelector(
            `.inputBox p[name="${uid}"]`,
        );
        const helperElementCheck = document.querySelector(
            `.inputBox p[name="pwck"]`,
        );

        if (!helperElement) return;

        if (value == '' || value == null) {
            helperElement.textContent = '*비밀번호를 입력해주세요.';
            helperElementCheck.textContent = '';
        } else if (!isValidPassword) {
            helperElement.textContent =
                '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
            helperElementCheck.textContent = '';
        } else {
            helperElement.textContent = '';
            modifyData.password = value;
        }
    } else if (uid == 'pwck') {
        const value = event.target.value;
        const helperElement = document.querySelector(
            `.inputBox p[name="${uid}"]`,
        );
        // pw 입력란의 현재 값
        const password = modifyData.password;

        if (value == '' || value == null) {
            helperElement.textContent = '*비밀번호 한번 더 입력해주세요.';
        } else if (password !== value) {
            helperElement.textContent = '*비밀번호가 다릅니다.';
        } else {
            helperElement.textContent = '';
            modifyData.passwordCheck = value;
        }
    }

    observeData();
};

const addEventForInputElements = () => {
    const InputElement = document.querySelectorAll('input');
    InputElement.forEach(element => {
        const id = element.id;

        element.addEventListener('input', event => blurEventHandler(event, id));
    });
};

const modifyPassword = async () => {
    const { password } = modifyData;

    const response = await changePassword(userId, password);

    if (response.status == HTTP_CREATED) {
        deleteCookie('session');
        deleteCookie('userId');
        localStorage.clear();
        location.href = '/html/login.html';
    } else {
        Dialog('비밀번호 변경 실패', () => {
            location.href = '/html/modifyPassword.html';
        });
    }
};

const init = () => {
    button.addEventListener('click', modifyPassword);
    prependChild(document.body, Header('커뮤니티', 1, profileImage));
    addEventForInputElements();
    observeData();
};

init();