import axiosInstance from "../lib/axios/auth.interceptor";

export class PersonsService {
    async list() {
        const response = await axiosInstance.get('/objeto/persons');
        return response.data;
    }
}