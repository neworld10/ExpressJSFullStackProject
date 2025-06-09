import { getServerUrl, padTo2Digits } from '../../utils/function.js';
import Dialog from '../dialog/dialog.js';
import { deleteComment, updateComment } from '../../api/commentRequest.js';

const DEFAULT_PROFILE_IMAGE = '../public/image/profile/default.jpg';
const HTTP_OK = 200;

const CommentItem = (data, writerId, postId, commentId) => {
    const CommentDelete = () => {
        Dialog(
            '댓글을 삭제하시겠습니까?',
            '삭제한 내용은 복구 할 수 없습니다.',
            async () => {
                const response = await deleteComment(postId, commentId);
                if (!response.ok) {
                    Dialog('삭제 실패', '댓글 삭제에 실패하였습니다.');
                    return;
                }

                if (response.status === HTTP_OK)
                    location.href = '/html/board.html?id=' + postId;
            },
        );
    };

    const CommentModify = () => {
        // 댓글 내용을 보여주는 p 태그 찾기
        const p = commentInfoWrap.querySelector('p');
        // 현재 댓글 내용 저장
        const originalContent = p.innerHTML.replace(/<br>/g, '\n');

        // textarea 생성 및 설정
        const textarea = document.createElement('textarea');
        textarea.value = originalContent;
        textarea.style.width = '100%'; // textarea 너비 설정
        textarea.style.height = '100px'; // textarea 높이 설정
        textarea.maxLength = 1500; // 최대 글자 수 제한

        // 사용자가 입력할 때마다 글자 수 체크
        textarea.addEventListener('input', () => {
            if (textarea.value.length > 1500) {
                // 1500자를 초과하는 경우, 초과분을 자름
                textarea.value = textarea.value.substring(0, 1500);
                // 사용자에게 경고 메시지를 보여주는 방법도 고려할 수 있음
                // alert('댓글은 1500자를 초과할 수 없습니다.');
            }
        });

        // 수정 완료(저장) 버튼 생성 및 설정
        const saveButton = document.createElement('button');
        saveButton.textContent = '저장';
        saveButton.onclick = async () => {
            if (textarea.value.length === 0) {
                Dialog('수정 실패', '댓글은 1자 이상 입력해주세요.');
                return;
            }
            // 서버로 수정된 댓글 내용 전송하는 로직
            const updatedContent = textarea.value;
            const sendData = {
                commentContent: updatedContent,
            };

            const response = await updateComment(postId, commentId, sendData);
            if (!response.ok)
                return Dialog('수정 실패', '댓글 수정에 실패하였습니다.');

            location.href = '/html/board.html?id=' + postId;
        };

        // 취소 버튼 생성 및 설정
        const cancelButton = document.createElement('button');
        cancelButton.textContent = '취소';
        cancelButton.onclick = () => {
            // textarea를 원래의 p 태그로 다시 변경
            p.innerHTML = originalContent.replace(/\n/g, '<br>'); // 원래 내용으로 복원
            commentInfoWrap.replaceChild(p, textarea); // textarea를 p로 교체
            commentInfoWrap.removeChild(saveButton); // 저장 버튼 제거
            commentInfoWrap.removeChild(cancelButton); // 취소 버튼 제거
        };

        // p 태그를 textarea로 대체
        commentInfoWrap.replaceChild(textarea, p);
        // textarea 옆에 저장 버튼 추가
        commentInfoWrap.appendChild(saveButton);
        // 저장 버튼 옆에 취소 버튼 추가
        commentInfoWrap.appendChild(cancelButton);
    };

    const commentItem = document.createElement('div');
    commentItem.className = 'commentItem';

    const picture = document.createElement('picture');

    const img = document.createElement('img');
    img.className = 'commentImg';
    img.src = data.profileImage === null ? DEFAULT_PROFILE_IMAGE : `${getServerUrl()}${data.profileImage}`
    picture.appendChild(img);

    const commentInfoWrap = document.createElement('div');
    commentInfoWrap.className = 'commentInfoWrap';

    const infoDiv = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.textContent = data.nickname;
    infoDiv.appendChild(h3);

    const h4 = document.createElement('h4');
    const date = new Date(data.created_at);
    const formattedDate = `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(date.getDate())} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`;
    h4.textContent = formattedDate;
    infoDiv.appendChild(h4);

    if (parseInt(data.user_id, 10) === parseInt(writerId, 10)) {
        const buttonWrap = document.createElement('span');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.onclick = CommentDelete;
        const modifyButton = document.createElement('button');
        modifyButton.textContent = '수정';
        modifyButton.onclick = CommentModify;

        buttonWrap.appendChild(modifyButton);
        buttonWrap.appendChild(deleteButton);

        infoDiv.appendChild(buttonWrap);
    }

    const p = document.createElement('p');
    p.innerHTML = data.comment_content.replace(/(?:\r\n|\r|\n)/g, '<br>');

    commentInfoWrap.appendChild(infoDiv);
    commentInfoWrap.appendChild(p);

    commentItem.appendChild(picture);
    commentItem.appendChild(commentInfoWrap);

    return commentItem;
};

export default CommentItem;