import React, { useEffect, useState } from 'react';
import './CreateUpdateCoursePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { Input } from '../../shared/components/Input/Input';
import { addNewTopicToCourse, deleteCourse, getCourseById, updateCourseDescription, updateCourseLanguage, updateCourseLevel, updateCourseTitle } from '../../shared/api/courseApi';
import { useParams } from 'react-router-dom';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import RadioButtonsGroup from '../../shared/components/RadioGroup/RadioGroup';
import { Block } from '../../shared/components/Block/Block';
import { Button } from '../../shared/components/Button/Button';
import { PopupWindow } from '../../shared/components/PopupWindow/PopupWindow';
import { Loader } from '../../shared/components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export function CreateUpdateCoursePage() {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState(null);
    const [description, setDescription] = useState("");
    const [targetlevel, setTargetLevel] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState(null);
    const [topics, setTopic] = useState(null);
    const [showCreateTopic, setShowCreateTopic] = useState(false);
    const [newTopic, setNewTopic] = useState("");
    const [isLoaded, setIsLoader] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const levels = ["Начальный", "Средний", "Продвинутый"]
    const language = ["HTML", "CSS"]


    const [editorStateDescription, setEditorStateDescription] = useState(null);

    useEffect(() => {
        setIsLoader(true);
        loadCourseInformation();
    }, [])

    useEffect(() => {
        loadDescriptionEditor();
    }, [description]);

    async function loadCourseInformation() {
        try {
            const courseId = params.courseId;
            const data = await getCourseById(courseId);

            setCourse(data.data);
            setTitle(data.data.title);
            setDescription(data.data.description);
            setTargetLevel(data.data.level);
            setTargetLanguage(data.data.progLanguage == null ? "HTML" : data.data.progLanguage);
            setTopic(data.data.topics)

            const descriptionData = data.data.description;
            loadDescriptionEditor(descriptionData);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally {
            setIsLoader(false);
        }

    }

    async function loadDescriptionEditor(descriptionData) {
        if (descriptionData) {
            const content = convertFromRaw(JSON.parse(descriptionData));

            const state = EditorState.createWithContent(content);
            setEditorStateDescription(state);
        }
        else {
            setEditorStateDescription(EditorState.createEmpty());
        }
    }

    const updateTextDescription = async (state) => {
        try {
            setEditorStateDescription(state);
            const data = convertToRaw(state.getCurrentContent());
            const dataJson = JSON.stringify(data);
            await updateCourseDescription(params.courseId, dataJson);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    };

    async function levelChangeClick(event) {
        try {
            const newLevel = event.target.value;

            await updateCourseLevel(params.courseId, newLevel);
            setTargetLevel(newLevel);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function languageChangeClick(event) {
        try {
            const newLanguage = event.target.value;
            setTargetLanguage(newLanguage);
            await updateCourseLanguage(params.courseId, newLanguage);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function createTopicClick() {
        try {
            setIsLoader(true);
            await addNewTopicToCourse(params.courseId, newTopic);
            setShowCreateTopic(false);
            setNewTopic("");
            await loadCourseInformation();
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally {
            setIsLoader(false);
        }
    }

    async function deleteTopicClick() {
        try {
            await deleteCourse(params.courseId);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        navigate(`/factorycourses`);
    }

    async function changeCourseTitle(value) {
        setTitle(value);
        await updateCourseTitle(params.courseId, value);
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
                                onChange={(event) => changeCourseTitle(event.target.value)}
                                name="newLogin"
                                rules={{ required: "Required field" }} />
                        </div>
                    </div>

                    {editorStateDescription && <div className='createCoursePage__description'>
                        <div className='createCoursePage__description__name'>Описание: </div>

                        <EditorBlock updateText={updateTextDescription} editorState={editorStateDescription} />
                    </div>}

                    {targetlevel && <div className='createCoursePage__level'>
                        <RadioButtonsGroup text="Уровень знаний" elements={levels} value={targetlevel} handleChange={levelChangeClick} />
                    </div>}

                    <div className='createCoursePage__progLanguage'>
                        {targetLanguage && <div className='createCoursePage__language'>
                            <RadioButtonsGroup text='Язык для изучения' elements={language} value={targetLanguage} handleChange={languageChangeClick} />
                        </div>}
                    </div>
                    <div className='createCoursePage__topics'>
                        {topics && topics.map(topic =>
                            <div createCoursePage__topics__block>
                                <Block key={topic._id} navigate={`/factorycourses/${params.courseId}/topic/${topic._id}`} title={topic.title} />
                            </div>
                        )}
                    </div>
                    <div className='createCoursePage__buttonCreate'>
                        <div className='createCoursePage__buttonCreate__create'>
                            <Button onClick={() => setShowCreateTopic(true)} value='Добавить тему' />
                        </div>

                        <div className='createCoursePage__buttonCreate__delete'>
                            <Button onClick={() => deleteTopicClick()} value='Удалить курс' color='red' />
                        </div>
                    </div>

                    <PopupWindow title="Добавить тему" open={showCreateTopic}>
                        <div className='coursesPage__popupWindow__input'>
                            <Input
                                label="Введите название темы"
                                type="text"
                                border="border"
                                value={newTopic}
                                onChange={(event) => setNewTopic(event.target.value)}
                                name="newTopic" />
                        </div>
                        <div className='coursesPage__popupWindow__button'>
                            <Button onClick={() => createTopicClick()} value='Создать' />
                            <Button onClick={() => setShowCreateTopic(false)} color='red' value='Отмена' />
                        </div>
                    </PopupWindow>
                </div>}
            </PageContent>

            <Loader show={isLoaded} />
        </>
    );
}