import {api} from "./api";

export async function createCourse(courseName, progLanguage) {
    await api.post(`/courses`, { title: courseName, progLanguage: progLanguage});
}

export async function getAllCourses() {
    const response = api.get(`/courses`);
    return response;
}

export async function getCourseById(courseId) {
    const response = api.get(`/courses/${courseId}`);
    return response;
}

export async function updateCourseDescription(courseId, description) {
    await api.put(`/courses/${courseId}/description`, {description: description})
}

export async function updateCourseLevel(courseId, level){
    await api.put(`/courses/${courseId}/level`, {level: level})
}

export async function updateCourseLanguage(courseId, language){
    await api.put(`/courses/${courseId}/language`, {language: language});
}