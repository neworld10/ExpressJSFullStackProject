exports.validEmail = email => {
    const regExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
};

exports.validPassword = password => {
    const regExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regExp.test(password);
};

exports.validNickname = nickname => {
    const regExp = /^[가-힣a-zA-Z0-9]{2,10}$/;
    return regExp.test(nickname);
};