import {api} from "./api";

export async function updateExampleCode(codeId, code) {
    await api.put(`codes/${codeId}`, {code: code});
}

export async function updateExerciseCode(codeId, code) {
    await api.put(`codes/${codeId}`, {code: code});
}