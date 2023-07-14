//import { store } from './../store/configureStore';
import axios, { AxiosResponse } from "axios";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";


axios.defaults.baseURL = 'http://localhost:5011/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
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
    rolesWithUsers: () => request.get('account/roles-with-users'),
    usersWithRoles: () => request.get('account/users-with-roles'),
    roles: () => request.get('account/getAllRoles'),
    createRole: (value: any) => request.post(`account/createrole?roleName=${value}`,{}),
    deleteRole: (value: any) => request.delete(`account/deleterole/${value}`),
    removeUserFromRoles: (username: string, value: any) => request.post(`account/remove-role-user/${username}?role=${value}`, {}),
    editRoles: (username: string, value: any) => request.post(`account/edit-roles/${username}?roles=${value}`, {}),
    updateRole: (roleName: string, value: any) => request.put(`account/updaterole/${roleName}?updatedName=${value}`, {}),
    getAllUsersExcel: () => axios.get('Account/getAllUserExcel', { responseType: 'blob' }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        console.log('response.data', response.data)
        link.setAttribute('download', 'abc.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    })
}

const Catalog = {
    productList : (params: URLSearchParams) => request.get('products',params),
    productDetails: (id: number) => request.get(`products/${id}`),
    supplierList: () => request.get('suppliers'),
    categoryList: () => request.get('categories')
}


const agent = {
    Account,
    Admin,
    Catalog
}

export default agent;