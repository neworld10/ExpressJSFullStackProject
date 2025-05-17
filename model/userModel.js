const dbConnect = require('../database/index.js');
const { STATUS_MESSAGE } = require('../util/constant/httpStatusCode');

/**
 * 로그인
 * 회원가입
 * 유저 정보 불러오기
 * 회원정보 수정
 * 비밀번호 변경
 * 회원 탈퇴
 * 이메일 중복 체크
 * 닉네임 중복 체크
 * 유저 세션 정보 업데이트
 * 유저 세션 정보 삭제
 */

// 로그인
exports.loginUser = async (requestData, response) => {
    const { email, password } = requestData;

    const sql = `SELECT * FROM user_table WHERE email = ? AND deleted_at IS NULL;`;
    const results = await dbConnect.query(sql, [email], response);

    if (!results[0] || results[0] === 'undefined' || results[0] === undefined)
        return null;

    if (results[0].file_id !== null) {
        const profileSql = `SELECT file_path FROM file_table WHERE file_id = ? AND deleted_at IS NULL AND file_category = 1;`;
        const profileResults = await dbConnect.query(
            profileSql,
            [results[0].file_id],
            response,
        );
        results[0].profileImagePath = profileResults[0].file_path;
    } else {
        results[0].profileImagePath = null;
    }

    const user = {
        userId: results[0].user_id,
        email: results[0].email,
        nickname: results[0].nickname,
        profileImagePath: results[0].profile_image_path,
        created_at: results[0].created_at,
        updated_at: results[0].updated_at,
        deleted_at: results[0].deleted_at,
    };

    return user;
};

// 회원가입
exports.signUpUser = async requestData => {
    const { email, password, nickname, profileImagePath } = requestData;

    const checkEmailSql = `SELECT email FROM user_table WHERE email = ?;`;
    const checkEmailResults = await dbConnect.query(checkEmailSql, [email]);

    if (checkEmailResults.length !== 0) return 'already_exist_email';

    const insertUserSql = `
    INSERT INTO user_table (email, password, nickname)
    VALUES (?, ?, ?);
    `;
    const userResults = await dbConnect.query(insertUserSql, [
        email,
        password,
        nickname,
    ]);

    if (!userResults.insertId) return null;

    let profileImageId = null;
    if (profileImagePath) {
        const insertFileSql = `
        INSERT INTO file_table (user_id, file_path, file_category)
        VALUES (?, ?, 1);
        `;
        const fileResults = await dbConnect.query(insertFileSql, [
            userResults.insertId,
            profileImagePath,
        ]);

        if (fileResults.insertId) {
            profileImageId = fileResults.insertId;

            const updateUserSql = `
            UPDATE user_table
            SET file_id = ?
            WHERE user_id = ?;
            `;
            await dbConnect.query(updateUserSql, [
                profileImageId,
                userResults.insertId,
            ]);
        }
    }

    return {
        userId: userResults.insertId,
        profileImageId: profileImageId,
    };
};

// 유저 정보 불러오기
exports.getUser = async requestData => {
    const { userId } = requestData;

    const sql = `
    SELECT user_table.*, COALESCE(file_table.file_path, NULL) AS file_path
    FROM user_table
    LEFT JOIN file_table ON user_table.file_id = file_table.file_id
    WHERE user_table.user_id = ? AND user_table.deleted_at IS NULL;
    `;
    const userData = await dbConnect.query(sql, [userId]);

    if (userData.length === 0) {
        return null;
    }

    const results = {
        userId: userData[0].user_id,
        email: userData[0].email,
        nickname: userData[0].nickname,
        profile_image: userData[0].file_path,
        created_at: userData[0].created_at,
        updated_at: userData[0].updated_at,
        deleted_at: userData[0].deleted_at,
    };
    return results;
};

// 회원정보 수정
exports.updateUser = async requestData => {
    const { userId, nickname, profileImagePath } = requestData;

    const updateUserSql = `
        UPDATE user_table
        SET nickname = ?
        WHERE user_id = ? AND deleted_at IS NULL;
    `;
    const updateUserResults = await dbConnect.query(updateUserSql, [
        nickname,
        userId,
    ]);

    if (!updateUserResults) return null;

    if (profileImagePath === undefined) return updateUserResults;

    const profileImageSql = `
        INSERT INTO file_table
        (user_id, file_path, file_category)
        VALUES (?, ?, 1);
    `;
    const profileImageResults = await dbConnect.query(profileImageSql, [
        userId,
        profileImagePath,
    ]);

    if (!profileImageResults.insertId)
        return STATUS_MESSAGE.UPDATE_PROFILE_IMAGE_FAILED;

    const userProfileSql = `
        UPDATE user_table
        SET file_id = ?
        WHERE user_id = ? AND deleted_at IS NULL;
    `;
    const userProfileResults = await dbConnect.query(userProfileSql, [
        profileImageResults.insertId,
        userId,
    ]);

    return userProfileResults;
};

// 비밀번호 변경
exports.changePassword = async requestData => {
    const { userId, password } = requestData;

    const sql = `
    UPDATE user_table
    SET password = ?
    WHERE user_id = ?;
    `;
    const results = await dbConnect.query(sql, [password, userId]);

    if (!results.affectedRows) return null;

    return results;
};

// 회원탈퇴
exports.softDeleteUser = async requestData => {
    const { userId } = requestData;
    const selectSql = `SELECT * FROM user_table WHERE user_id = ? AND deleted_at IS NULL;`;
    const selectResults = await dbConnect.query(selectSql, [userId]);

    if (!selectResults.length) return null;

    const updateSql = `UPDATE user_table SET deleted_at = now() WHERE user_id = ?;`;
    await dbConnect.query(updateSql, [userId]);

    return selectResults[0];
};

// 이메일 중복 체크
exports.checkEmail = async requestData => {
    const { email } = requestData;

    const sql = `SELECT email FROM user_table WHERE email = ?;`;
    const results = await dbConnect.query(sql, [email]);

    if (!results || results.length === 0) return null;

    return results;
};

// 이메일 중복 체크
exports.checkNickname = async requestData => {
    const { nickname } = requestData;

    const sql = `SELECT nickname FROM user_table WHERE nickname = ?;`;
    const results = await dbConnect.query(sql, [nickname]);

    if (!results || results.length === 0) return null;

    return results;
};