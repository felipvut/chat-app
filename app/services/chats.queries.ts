import { Message } from "../(auth)/chat/page";
import axiosInstance from "../lib/axios/auth.interceptor";

export class ChatsService {
    async myChats() {
        const response = await axiosInstance.get('/my-chats');
        return response.data;
    }    
    
    async getChat(uuid: string) {
        const response = await axiosInstance.get('/get-chat/' + uuid);
        return response.data;
    }    

    async getMessages(uuid: string) {
        const response = await axiosInstance.get('/messages/' + uuid);
        return response.data;
    }

    async sendMessage(data: Message) {
        const response = await axiosInstance.post('/messages/' + data?.chats_uuid, data);
        return response.data;
    }
}