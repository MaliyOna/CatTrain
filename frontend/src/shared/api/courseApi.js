import {api} from "./api";

export async function createCourse(courseName, progLanguage) {
    await api.post(`/courses`, { title: courseName, progLanguage: progLanguage});
}

export async function getAllCourses() {
    const response = api.get(`/courses`);
    return response;
}