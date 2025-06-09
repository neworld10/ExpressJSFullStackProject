document.addEventListener('DOMContentLoaded', () => {
    // 버튼에 클릭 이벤트 리스너 추가
    document.getElementById('requestDataBtn').addEventListener('click', () => {
        // 서버에 데이터 요청
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json()) // 응답을 JSON으로 파싱
            .then(data => {
		            // 콘솔에 데이터 출력
                console.log(data);
            })
            .catch(error => {
                console.error('데이터 요청 중 에러 발생:', error);
            });
    });
});
