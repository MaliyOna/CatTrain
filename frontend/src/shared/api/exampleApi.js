import {api} from "./api";

export async function getExampleById(exampleId) {
    const response = await api.get(`/examples/${exampleId}`);
    return response;
}

export async function updateExampleTitle(exampleId, title) {
    await api.put(`/examples/${exampleId}/title`, {title: title});
}

export async function updateExampleDescription(exampleId, description) {
    await api.put(`/examples/${exampleId}/description`, {description: description});
}
