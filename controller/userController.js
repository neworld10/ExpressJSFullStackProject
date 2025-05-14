// Dummy data, JSON구조
const users = [
    { userId: 1, name: 'John', email: 'john@example.com' },
    { userId: 2, name: 'Jane', email: 'jane@example.com' },
    { userId: 3, name: 'Bob', email: 'bob@example.com' },
];

// 모든 사용자 정보를 반환하는 함수입니다.
const getUsers = (request, response) => {
    try {
        return response.status(200).json({
            status: 200,
            message: null,
            data: users,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// ID를 기반으로 특정 사용자 정보를 반환하는 함수입니다.
const getUser = (request, response) => {
    try {
        const userId = parseInt(request.params.user_id); // 요청에서 ID를 파싱합니다.
        const user = users.find(user => user.userId === userId); // 해당 ID를 가진 사용자를 찾습니다.
        if (!user) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_user',
                data: null,
            });
        }

        return response.status(200).json({
            status: 200,
            message: null,
            data: user,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// 새로운 사용자를 추가하는 함수입니다.
const addUser = (request, response) => {
    try {
        const newUser = {
            userId: users.length + 1, // 새 사용자에게 고유 ID를 할당합니다.
            name: request.body.name,
            email: request.body.email,
        };
        users.push(newUser); // 새 사용자를 목록에 추가합니다.

        return response.status(201).json({
            status: 201,
            message: 'create_user_success',
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// 기존 사용자의 정보를 수정하는 함수입니다.
const updateUser = (request, response) => {
    try {
        const user = users.find(
            user => user.userId === parseInt(request.params.user_id),
        ); // 수정할 사용자를 찾습니다.
        if (!user) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_user',
                data: null,
            });
        }
        user.name = request.body.name; // 사용자 이름을 수정합니다.
        user.email = request.body.email; // 사용자 이메일을 수정합니다.

        return response.status(200).json({
            status: 200,
            message: 'update_user_success',
            data: null,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

// 사용자를 삭제하는 함수입니다.
const deleteUser = (request, response) => {
    try {
        const userIndex = users.findIndex(
            user => user.userId === parseInt(request.params.user_id),
        ); // 삭제할 사용자의 인덱스를 찾습니다.
        if (userIndex === -1) {
            return response.status(404).json({
                status: 404,
                message: 'not_found_user',
                data: null,
            });
        }
        users.splice(userIndex, 1); // 사용자 목록에서 해당 사용자를 제거합니다.
        return response.status(200).json({
            status: 200,
            message: 'delete_user_success',
            data: null,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: 500,
            message: 'internal_server_error',
            data: null,
        });
    }
};

export default {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
};