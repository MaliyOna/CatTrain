import React, { useEffect, useState } from 'react';
import './CreateUpdateCoursePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { Input } from '../../shared/components/Input/Input';
import { getCourseById, updateCourseDescription, updateCourseLanguage, updateCourseLevel } from '../../shared/api/courseApi';
import { useParams } from 'react-router-dom';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import RadioButtonsGroup from '../../shared/components/RadioGroup/RadioGroup';

export function CreateUpdateCoursePage() {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState(null);
    const [description, setDescription] = useState("");
    const [targetlevel, setTargetLevel] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState(null);
    const params = useParams();

    const levels = ["Начальный", "Средний", "Продвинутый"]
    const language = ["HTML", "CSS"]


    const [editorStateDescription, setEditorStateDescription] = useState(null);

    useEffect(() => {
        loadCourseInformation();
    }, [])

    useEffect(() => {
        loadDescriptionEditor();
    }, [description]);

    const loadCourseInformation = async () => {
        const courseId = params.courseId;
        const data = await getCourseById(courseId);
        console.log(data.data);
        setCourse(data.data);
        setTitle(data.data.title);
        setDescription(data.data.description);
        setTargetLevel(data.data.level);
        setTargetLanguage(data.data.progLanguage == null ? "HTML" : data.data.progLanguage);
        const descriptionData = data.data.description;
        loadDescriptionEditor(descriptionData);
    }

    async function loadDescriptionEditor(descriptionData) {
        if (descriptionData) {
            console.log(descriptionData)

            const content = convertFromRaw(JSON.parse(descriptionData));

            const state = EditorState.createWithContent(content);
            setEditorStateDescription(state);
        }
        else {
            setEditorStateDescription(EditorState.createEmpty());
        }
    }

    const updateTextDescription = async (state) => {
        setEditorStateDescription(state);
        const data = convertToRaw(state.getCurrentContent());
        const dataJson = JSON.stringify(data);
        await updateCourseDescription(params.courseId, dataJson);
        await loadCourseInformation();
    };

    async function levelChangeClick(event) {
        const newLevel = event.target.value;

        await updateCourseLevel(params.courseId, newLevel);
        setTargetLevel(newLevel);
    }

    async function languageChangeClick(event){
        const newLanguage = event.target.value;
        setTargetLanguage(newLanguage);
        await updateCourseLanguage(params.courseId, newLanguage);
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {course && <div className='createCoursePage'>
                    <div className='createCoursePage__title'>
                        <div className='createCoursePage__title__name'>Название курса: </div>
                        <div className='createCoursePage__title__input'>
                            <Input
                                type="text"
                                border="border"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                name="newLogin"
                                rules={{ required: "Required field" }} />
                        </div>
                    </div>

                    {editorStateDescription && <div className='createCoursePage__description'>
                        <div className='createCoursePage__description__name'>Описание: </div>

                        <EditorBlock updateText={updateTextDescription} editorState={editorStateDescription} />
                    </div>}

                    {targetlevel && <div className='createCoursePage__level'>
                        <RadioButtonsGroup elements={levels} value={targetlevel} handleChange={levelChangeClick} />
                    </div>}

                    <div className='createCoursePage__progLanguage'>
                        {targetLanguage && <div className='createCoursePage__level'>
                            <RadioButtonsGroup elements={language} value={targetLanguage} handleChange={languageChangeClick} />
                        </div>}
                    </div>
                    <div className='createCoursePage__topics'></div>
                </div>}
            </PageContent>
        </>
    );
}