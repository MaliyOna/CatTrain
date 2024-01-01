import {api} from "./api";

export async function getExerciseById(exerciseId) {
    const response = await api.get(`/exercises/${exerciseId}`);
    return response;
}

export async function updateExerciseTitle(exerciseId, title) {
    await api.put(`/exercises/${exerciseId}/title`, {title: title});
}

export async function updateExerciseDescription(exerciseId, description) {
    await api.put(`/exercises/${exerciseId}/description`, {description: description});
}

export async function deleteExercise(exerciseId) {
    await api.delete(`/exercises/${exerciseId}`);
}
