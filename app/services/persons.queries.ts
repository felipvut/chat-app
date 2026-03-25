import axiosInstance from "../lib/axios/auth.interceptor";

export class PersonsService {
    async list() {
        const response = await axiosInstance.get('/objeto/persons');
        return response.data;
    }

    async listNewsChats() {
        const response = await axiosInstance.get('/news-chats');
        return response.data;
    }
}