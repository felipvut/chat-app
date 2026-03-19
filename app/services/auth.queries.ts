/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "../lib/axios/auth.interceptor";


export class AuthService {
    async login(data: any) {
        const response = await axiosInstance.post('/login', data);
        return response.data;
    }

    async register(data: any) {
        const response = await axiosInstance.post('/register', data);
        return response.data;
    }
}