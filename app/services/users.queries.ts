import axiosInstance from "../lib/axios/auth.interceptor";

export class UsersService {
    async list() {
        const response = await axiosInstance.get('/users');
        return response.data;
    }
}