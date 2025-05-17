const dbConnect = require('../database/index.js');

/**
 * 댓글 조회
 * 댓글 작성
 * 댓글 수정
 * 댓글 삭제
 */

// 댓글 조회
exports.getComments = async requestData => {
    const { postId } = requestData;

    const sql = `
    SELECT ct.*, ut.file_id, COALESCE(ft.file_path, NULL) AS profileImage
    FROM comment_table AS ct
    LEFT JOIN user_table AS ut ON ct.user_id = ut.user_id
    LEFT JOIN file_table AS ft ON ut.file_id = ft.file_id
    WHERE ct.post_id = ? AND ct.deleted_at IS NULL;
    `;
    const results = await dbConnect.query(sql, [postId]);

    if (!results || results.length === 0) return null;
    return results;
};

// 댓글 작성
exports.writeComment = async requestData => {
    const { postId, userId, commentContent } = requestData;

    const nicknameSql = `
        SELECT nickname FROM user_table
        WHERE user_id = ? AND deleted_at IS NULL;
        `;
    const nicknameResults = await dbConnect.query(nicknameSql, [userId]);

    if (!nicknameResults || nicknameResults.length === 0) return null;

    const { nickname } = nicknameResults[0];

    const checkPostSql = `
        SELECT * FROM post_table
        WHERE post_id = ? AND deleted_at IS NULL;
        `;
    const checkPostResults = await dbConnect.query(checkPostSql, [postId]);

    if (!checkPostResults || checkPostResults.length === 0) return null;

    const sql = `
        INSERT INTO comment_table
        (post_id, user_id, nickname, comment_content)
        VALUES (?, ?, ?, ?);
        `;
    const results = await dbConnect.query(sql, [
        postId,
        userId,
        nickname,
        commentContent,
    ]);

    if (!results) return 'insert_error';

    const commentsCountSql = `
        UPDATE post_table
        SET comment_count = comment_count + 1
        WHERE post_id = ?;
        `;
    await dbConnect.query(commentsCountSql, [postId]);

    return results;
};

// 댓글 수정
exports.updateComment = async requestData => {
    const { postId, commentId, userId, commentContent } = requestData;

    const checkPostSql = `
        SELECT * FROM post_table
        WHERE post_id = ? AND deleted_at IS NULL;
    `;
    const checkPostResults = await dbConnect.query(checkPostSql, [postId]);

    if (!checkPostResults || checkPostResults.length === 0) return null;

    const sql = `
        UPDATE comment_table
        SET comment_content = ?
        WHERE post_id = ? 
        AND comment_id = ? 
        AND user_id = ?
        AND deleted_at IS NULL;
    `;
    const results = await dbConnect.query(sql, [
        commentContent,
        postId,
        commentId,
        userId,
    ]);

    if (!results || results.affectedRows === 0) return 'update_error';

    return results;
};

// 댓글 삭제
exports.softDeleteComment = async requestData => {
    const { postId, commentId, userId } = requestData;

    // 게시물 존재 여부 확인
    const checkPostSql = `
    SELECT * FROM post_table
    WHERE post_id = ? AND deleted_at IS NULL;
    `;
    const checkPostResults = await dbConnect.query(checkPostSql, [postId]);
    if (!checkPostResults || checkPostResults.length === 0) {
        return null;
    }

    // userId가 댓글 작성자 userId와 일치하는지 확인
    const checkUserSql = `
    SELECT * FROM comment_table
    WHERE post_id = ? AND comment_id = ? AND user_id = ? AND deleted_at IS NULL;
    `;
    const checkUserResults = await dbConnect.query(checkUserSql, [
        postId,
        commentId,
        userId,
    ]);

    if (!checkUserResults || checkUserResults.length === 0) {
        return 'no_auth_error';
    }

    // 댓글 소프트 삭제
    const sql = `
    UPDATE comment_table
    SET deleted_at = now()
    WHERE post_id = ?
    AND comment_id = ?
    AND user_id = ?
    AND deleted_at IS NULL;
    `;
    const results = await dbConnect.query(sql, [postId, commentId, userId]);

    if (!results || results.affectedRows === 0) return 'delete_error';

    // 댓글 수 감소
    const commentsCountSql = `
    UPDATE post_table
    SET comment_count = comment_count - 1
    WHERE post_id = ?;
    `;
    await dbConnect.query(commentsCountSql, [postId]);

    return results;
};
