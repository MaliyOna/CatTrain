import {api} from "./api";

export async function getTopicById(topicId) {
    const response = api.get(`/topics/${topicId}`);
    return response;
}

export async function updateTopicTitle(topicId, title) {
    api.put(`/topics/${topicId}/title`, {title: title});
}

export async function updateTopicDescription(topicId, description) {
    api.put(`/topics/${topicId}/description`, {description: description});
}

export async function addNewExampleToTopic(topicId, exampleTitle) {
    api.post(`/topics/${topicId}/example`, {title: exampleTitle});
}

export async function addNewExerciseToTopic(topicId, exerciseTitle) {
    api.post(`/topics/${topicId}/exercise`, {title: exerciseTitle});
}