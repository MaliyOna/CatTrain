import React, { useEffect, useState } from 'react';
import './CoursePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { checkOrAddConnectionCourse, getCourseById } from '../../shared/api/courseApi';
import { useParams } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import { Block } from '../../shared/components/Block/Block';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function CoursePage() {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState(null);
    const [description, setDescription] = useState("");
    const [targetlevel, setTargetLevel] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState(null);
    const [topics, setTopic] = useState(null);
    const [editorDescription, setEditorDescription] = useState(null);
    const [isLoaded, setIsLoader] = useState(false);
    const params = useParams();

    useEffect(() => {
        loadCourseInformation();
        checkConnection();
    }, [])

    async function checkConnection() {
        await checkOrAddConnectionCourse(params.courseId, localStorage.getItem("userName"));
    }

    async function loadCourseInformation() {
        try {
            const courseId = params.courseId;
            const data = await getCourseById(courseId);
            setCourse(data.data);
            setTitle(data.data.title);
            setDescription(data.data.description);
            setTargetLevel(data.data.level);
            setTargetLanguage(data.data.progLanguage == null ? "HTML" : data.data.progLanguage);
            setTopic(data.data.topics);
            const descriptionData = data.data.description;
            loadDescriptionEditor(descriptionData);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally{
            setIsLoader(false);
        }
    }

    function loadDescriptionEditor(descriptionData) {
        if (descriptionData) {
            const content = convertFromRaw(JSON.parse(descriptionData));

            const state = EditorState.createWithContent(content);
            setEditorDescription(state);
        }
        else {
            setEditorDescription(EditorState.createEmpty());
        }
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {course &&
                    <div className='coursePage'>
                        <div className='coursePage__title'>Название курса: {title}</div>
                        <div className='coursePage__level'>Уровень: {targetlevel}</div>
                        <div className='coursePage__language'>Язык: {targetLanguage}</div>
                        <div className='coursePage__description'>
                            <EditorBlock editorState={editorDescription} />
                        </div>

                        <div className='topics'>
                            {topics.map(topic =>
                                <Block key={topic._id} navigate={`/courses/${params.courseId}/topics/${topic._id}`} title={topic.title} />
                            )}
                        </div>
                    </div>
                }
            </PageContent>
            <Loader show={isLoaded} />
        </>
    );
}
