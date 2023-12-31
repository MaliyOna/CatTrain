import {api} from "./api";

export async function createCourse(courseName, progLanguage, englishTitle) {
    await api.post(`/courses`, { title: courseName, progLanguage: progLanguage, englishTitle: englishTitle});
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

export async function updateCourseTitle(courseId, title) {
    await api.put(`/courses/${courseId}/title`, {title: title})
}

export async function updateCourseLevel(courseId, level) {
    await api.put(`/courses/${courseId}/level`, {level: level})
}

export async function updateCourseLanguage(courseId, language) {
    await api.put(`/courses/${courseId}/language`, {language: language});
}

export async function addNewTopicToCourse(courseId, title) {
    await api.post(`/courses/${courseId}/newtopic`, {title: title})
}

export async function checkOrAddConnectionCourse(courseId, userName) {
    await api.post(`/courses/${courseId}/usercourses`, {userName: userName});
}

export async function checkOrAddConnectionTopic(courseId, topicId, userName) {
    await api.post(`/courses/${courseId}/topic/${topicId}`, {userName: userName});
}

export async function addExerciseToUserTopic(topicId, userName, exerciseId) {
    await api.put(`/courses/topic/${topicId}/exercise/${exerciseId}`, {userName: userName})
}

export async function deleteCourse(courseId) {
    await api.delete(`/courses/${courseId}`);
}