import {api} from "./api";

export async function updateExampleCode(codeId, code) {
    api.put(`codes/${codeId}`, {code: code});
}