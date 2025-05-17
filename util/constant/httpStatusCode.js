const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    END: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVER_TIMEOUT: 503,
};

const STATUS_MESSAGE = {
    /*================= Common =================*/
    INVALID_OFFSET_OR_LIMIT: 'invalid_offset_or_limit',
    TOO_MANY_REQUESTS: 'too_many_requests',

    /*================= User =================*/
    REQUIRED_EMAIL: 'required_email',
    REQUIRED_PASSWORD: 'required_password',
    REQUIRED_AUTHORIZATION: 'required_authorization',

    REQUEST_TIMEOUT: 'request_timeout',

    INVALID_EMAIL_OR_PASSWORD: 'invalid_email_or_password',
    INVALID_EMAIL: 'invalid_email',
    INVALID_NICKNAME: 'invalid_nickname',
    INVALID_PASSWORD: 'invalid_password',
    INVALID_USER_ID: 'invalid_user_id',

    ALREADY_EXIST_EMAIL: 'already_exist_email',
    NOT_FOUND_USER: 'not_found_user',

    AVAILVABLE_EMAIL: 'available_email',
    AVAILABLE_NICKNAME: 'available_nickname',

    SIGNUP_FAILED: 'signup_failed',
    UPDATE_PROFILE_IMAGE_FAILED: 'update_profile_image_failed',

    LOGIN_SUCCESS: 'login_success',
    LOGOUT_SUCCESS: 'logout_success',
    SIGNUP_SUCCESS: 'signup_success',
    UPDATE_USER_DATA_SUCCESS: 'update_user_data_success',
    CHANGE_USER_PASSWORD_SUCCESS: 'change_user_password_success',
    DELETE_USER_DATA_SUCCESS: 'delete_user_data_success',

    /*================= Post =================*/
    INVALID_POST_ID: 'invalid_post_id',
    INVALID_POST_TITLE: 'invalid_post_title',
    INVALID_POST_TITLE_LENGTH: 'invalid_post_title_length',
    INVALID_POST_CONTENT: 'invalid_post_content',
    INVALID_POST_CONTENT_LENGHT: 'invalid_post_content_length',

    NOT_A_SINGLE_POST: 'not_a_single_post',

    GET_POSTS_SUCCESS: 'get_posts_success',
    WRITE_POST_SUCCESS: 'write_post_success',
    UPDATE_POST_SUCCESS: 'update_post_success',
    DELETE_POST_SUCCESS: 'delete_post_success',

    WRITE_POST_FAILED: 'write_post_failed',

    /*================= Comment =================*/
    INVALID_COMMENT_ID: 'invalid_comment_id',
    INVALID_COMMENT_CONTENT: 'invalid_comment_content',
    INVALID_COMMENT_CONTENT_LENGTH: 'invalid_comment_content_length',

    NOT_A_SINGLE_COMMENT: 'not_a_single_comment',

    WRITE_COMMENT_SUCCESS: 'write_comment_success',
    UPDATE_COMMENT_SUCCESS: 'update_comment_success',
    DELETE_COMMENT_SUCCESS: 'delete_comment_success',

    /*================= File =================*/
    INVALID_FILE: 'invalid_file',

    FILE_UPLOAD_SUCCESS: 'file_upload_success',

    INTERNAL_SERVER_ERROR: 'internal_server_error',
};

module.exports = {
    STATUS_CODE,
    STATUS_MESSAGE,
};