import {api} from "./api";

export async function getUser(userName) {
    const response = api.get(`/userProfile/${userName}`);
    return response;
}