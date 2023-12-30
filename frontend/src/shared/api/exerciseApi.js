import {api} from "./api";

export async function getExerciseById(exerciseId) {
    const response = api.get(`/exercises/${exerciseId}`);
    return response;
}

export async function updateExerciseTitle(exerciseId, title) {
    api.put(`/exercises/${exerciseId}/title`, {title: title});
}

export async function updateExerciseDescription(exerciseId, description) {
    api.put(`/exercises/${exerciseId}/description`, {description: description});
}
