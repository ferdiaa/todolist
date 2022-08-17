import axios from 'axios';
import CONFIG from '../globals/config';
import { todoService } from '../globals/services';
const callTodoActivity = (method, url, data = {}) => {
    return axios({ url, method, data: {...data} })
    .then( response => response.data)
    .catch(error => {
        return {
            status:'failed',
            message:error.response.data.message
        }
    })
}

export const getTodoActivity = async (id) => {
    const response = await callTodoActivity('get', `${todoService}?activity_group_id=${id}`);
    return response.status !== 'failed' ? response : undefined;
};
export const addTodoActivity = async (data) => {
    const response = await callTodoActivity('post', todoService, data);
    return response;
}
export const deleteTodoActivity = async (id) => {
    const response = await callTodoActivity('delete', `${todoService}/${id}`);
    return response;
}
// export const detailActivity = async (id) => {
//     const response = await callTodoActivity('get', `${todoService}/${id}`);
//     return response;
// }

export const editTodoActivity = async (data) => {
    const response = await callTodoActivity('patch', `${todoService}/${data.id}`, data);
    return response;
}