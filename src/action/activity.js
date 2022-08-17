import axios from 'axios';
import CONFIG from '../globals/config';
import { activityService } from '../globals/services';
const callActivity = (method, url, data = {}) => {
    return axios({ url, method, data: {...data} })
    .then( response => response.data)
    .catch(error => {
        return {
            status:'failed',
            message:error.response.data.message
        }
    })
}

export const getActivity = async () => {
    const response = await callActivity('get', `${activityService}?email=${CONFIG.email}`);
    return response.status !== 'failed' ? response : undefined ;
};
export const addActivity = async () => {
    const data = {
        email: CONFIG.email,
        title : "New Activity",
    }
    const response = await callActivity('post', activityService, data);
    return response;
}
export const deleteActivity = async (id) => {
    const response = await callActivity('delete', `${activityService}/${id}`);
    return response;
}
export const detailActivity = async (id) => {
    const response = await callActivity('get', `${activityService}/${id}`);
    return response;
}

export const editActivity = async ({ id, title }) => {
    const response = await callActivity('patch', `${activityService}/${id}`, { title });
    return response;
}