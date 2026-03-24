import axiosInstance from "../lib/axios/auth.interceptor";
import { Login, Register } from "./types/auth";

export class AuthService {
    async login(data: Login) {
        const response = await axiosInstance.post('/login', data);
        return response.data;
    }

    async register(data: Register) {
        const response = await axiosInstance.post('/register', data);
        return response.data;
    }

    async me() {
        const response = await axiosInstance.get('/me');
        return response.data;
    }
}