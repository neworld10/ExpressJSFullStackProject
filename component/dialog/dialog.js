/**
 * @param {string} title 다이얼로그 제목
 * @param {string} description  다이얼로그 내용
 * @param {Function} submitCallBack 확인 버튼을 눌렀을 때 실행 될 콜백 함수, 작성하지 않으면 확인, 취소 동일한 동작으로 다이얼로그를 닫음
 * @param {alert | textarea} type 다이얼로그 타입
 */
const Dialog = (title, description, submitCallBack, type = 'alert') => {
    const wrap = document.createElement('div');
    const titleWrap = document.createElement('h2');
    const descriptionWrap = document.createElement(
        type == 'alert' ? 'p' : 'textarea',
    );

    const buttonWrap = document.createElement('div');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');

    wrap.classList.add('dialog');
    titleWrap.classList.add('dialog-title');
    descriptionWrap.classList.add('dialog-description');
    if (type == 'textarea') {
        descriptionWrap.classList.add('dialog-description-textarea');
    }
    buttonWrap.classList.add('dialog-button-wrap');
    cancelButton.classList.add('dialog-button');
    cancelButton.classList.add('dialog-button-cancel');
    submitButton.classList.add('dialog-button');
    submitButton.classList.add('dialog-button-submit');

    wrap.appendChild(titleWrap);
    wrap.appendChild(descriptionWrap);
    wrap.appendChild(buttonWrap);
    buttonWrap.appendChild(cancelButton);
    buttonWrap.appendChild(submitButton);

    titleWrap.textContent = title;
    descriptionWrap.textContent = description;
    cancelButton.textContent = '취소';
    submitButton.textContent = '확인';

    const Background = document.createElement('div');
    Background.classList.add('dialog-background');
    Background.appendChild(wrap);

    document.body.appendChild(Background);

    cancelButton.addEventListener('click', () => {
        Background.remove();
    });
    submitButton.addEventListener('click', () => {
        if (submitCallBack) {
            if (type == 'alert') submitCallBack();
            else submitCallBack(descriptionWrap.value);
        }
        Background.remove();
    });
};

export default Dialog;
