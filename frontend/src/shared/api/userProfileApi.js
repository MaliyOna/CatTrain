import {api} from "./api";

export async function getUser(userName) {
    const response = await api.get(`/userProfile/${userName}`);
    return response;
}