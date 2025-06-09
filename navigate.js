// DOM이 로드된 후 실행될 함수를 설정합니다.
document.addEventListener('DOMContentLoaded', () => {
    // 'goButton' ID를 가진 버튼에 대한 참조를 얻습니다.
    const button = document.getElementById('goButton');
    // 버튼에 클릭 이벤트 리스너를 추가합니다.
    button.addEventListener('click', () => {
        // 지정된 URL로 페이지를 이동합니다.
        window.location.href = 'https://example.com';
    });
});