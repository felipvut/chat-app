import axiosInstance from "../lib/axios/auth.interceptor";

export class ChatsService {
    async myChats() {
        const response = await axiosInstance.get('/my-chats');
        return response.data;
    }
}