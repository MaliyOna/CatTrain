import {api} from "./api";

export async function getTopicById(topicId) {
    const response = await api.get(`/topics/${topicId}`);
    return response;
}

export async function updateTopicTitle(topicId, title) {
    await api.put(`/topics/${topicId}/title`, {title: title});
}

export async function updateTopicDescription(topicId, description) {
    await api.put(`/topics/${topicId}/description`, {description: description});
}

export async function addNewExampleToTopic(topicId, exampleTitle) {
    await api.post(`/topics/${topicId}/example`, {title: exampleTitle});
}

export async function addNewExerciseToTopic(topicId, exerciseTitle) {
    await api.post(`/topics/${topicId}/exercise`, {title: exerciseTitle});
}

export async function deleteTopic(topicId) {
    await api.delete(`/topics/${topicId}`);
}