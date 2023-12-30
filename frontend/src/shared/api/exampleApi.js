import {api} from "./api";

export async function getExampleById(exampleId) {
    const response = api.get(`/examples/${exampleId}`);
    return response;
}

export async function updateExampleTitle(exampleId, title) {
    api.put(`/examples/${exampleId}/title`, {title: title});
}

export async function updateExampleDescription(exampleId, description) {
    api.put(`/examples/${exampleId}/description`, {description: description});
}
