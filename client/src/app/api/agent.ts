//import { store } from './../store/configureStore';
import axios, { AxiosResponse } from "axios";
import { store } from "../store/configureStore";


axios.defaults.baseURL = 'http://localhost:5011/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})




const request = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody)
}



const Account = {
    login: (values: any) => request.post('account/login', values),
    register: (values: any) => request.post('account/register', values),
    currentUser: () => request.get('account/currentUser')
}

const Admin = {
    roles: () => request.get('account/roles-with-users'),
    createRole: (value: any) => request.post(`account/createrole?roleName=${value}`,{}),
    removeUserFromRoles: (username: string, value: any) => request.post(`account/remove-role-user/${username}?role=${value}`, {})
}

const agent = {
    Account,
    Admin
}

export default agent;