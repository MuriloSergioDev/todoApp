import api from './api';

export const userService = {
    login,
    register,
    verifyToken,
    createNewTask,
    deleteTaskById,
    updateTaskById
};

interface user {
    username: string,
    password: string
}

interface NewTaskInterface {
    title?: string,
    status?: string,
    deadline?: string,
    description?: string,
    checklist?: Array<string>
}

async function login(user: user) {

    const data = {
        username: user.username,
        password: user.password,
    };

    try {
        const response = await api.post(`user/signIn`, data);

        if (response.status === 200) {
            console.log('Voce foi logado');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('idUser', response.data.idUser);
            localStorage.setItem('username', response.data.username);
            return response;
        }
        //console.log(response);
    } catch (error) {
        return error;
        //console.warn(error);
    }
}

async function register(user: user) {

    const data = {
        username: user.username,
        password: user.password,
    };

    try {
        const response = await api.post(`user/signUp`, data);
        
        return response;
    } catch (error) {
        return error;
        //console.warn(error);
    }
}

async function verifyToken(token: string) {
    try {
        const response = await api.post('user/verifyToken', { token });

        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function createNewTask(task: NewTaskInterface) {
    try {
        const response = await api.post('task/newTask', task);

        return response;
    } catch (error) {
        return error;
    }
}

async function deleteTaskById(id: string) {
    try {
        const response = await api.delete(`task/deleteTask/${id}`);

        return response;
    } catch (error) {
        return error;
    }
}

async function updateTaskById(id: string, task : NewTaskInterface) {
    try {
        const response = await api.put(`task/updateTask/${id}`, task);

        return response;
    } catch (error) {
        return error;
    }
}