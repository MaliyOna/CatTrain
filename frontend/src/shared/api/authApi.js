import {api} from "./api";

export async function createUser(user) {
    const response = await api.post(`/auth/registration`, user);
    return response;
}

export async function loginUser(user) {
    const response = await api.post(`/auth/login`, user);
    return response
}