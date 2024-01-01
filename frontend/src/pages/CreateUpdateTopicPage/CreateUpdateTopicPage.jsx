import React, { useEffect, useState } from 'react';
import './CreateUpdateTopicPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { addNewExampleToTopic, addNewExerciseToTopic, getTopicById, updateTopicDescription, updateTopicTitle } from '../../shared/api/topicApi';
import { useParams } from 'react-router-dom';
import { Input } from '../../shared/components/Input/Input';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import { Block } from '../../shared/components/Block/Block';
import { Button } from '../../shared/components/Button/Button';
import { PopupWindow } from '../../shared/components/PopupWindow/PopupWindow';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function CreateUpdateTopicPage() {
    const [topic, setTopic] = useState(null);
    const [title, setTitle] = useState(null);
    const [editorStateDescription, setEditorStateDescription] = useState(null);
    const [examples, setExamples] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [showNewExample, setShowNewExample] = useState(false);
    const [showNewExercise, setShowNewExercise] = useState(false);
    const [newExampleTitle, setNewExampleTitle] = useState("");
    const [newExerciseTitle, setNewExerciseTitle] = useState("");
    const [isLoaded, setIsLoader] = useState(false);
    const params = useParams();

    useEffect(() => {
        loadTopicInformation();
    }, [])

    async function loadTopicInformation() {
        setIsLoader(true);

        try {
            const data = await getTopicById(params.topicId);

            console.log(data.data);
            setTitle(data.data.title);
            setTopic(data.data);
            setExamples(data.data.examples)
            setExercises(data.data.exercises)

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

    async function updateTopicName(value) {
        try {
            setIsLoader(true);

            setTitle(value);
            await updateTopicTitle(params.topicId, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally {
            setIsLoader(false);
        }
    }

    async function updateTextDescription(state) {
        setEditorStateDescription(state);
        const data = convertToRaw(state.getCurrentContent());
        const dataJson = JSON.stringify(data);
        await updateTopicDescription(params.topicId, dataJson);
    }

    async function createNewExample() {
        try {
            setIsLoader(true);

            await addNewExampleToTopic(params.topicId, newExampleTitle);
            await loadTopicInformation();
            setShowNewExample(false);
            setNewExampleTitle("");
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally {
            setIsLoader(false);
        }
    }

    async function createNewExercise() {
        try {
            setIsLoader(true);
            await addNewExerciseToTopic(params.topicId, newExerciseTitle);
            await loadTopicInformation();
            setShowNewExercise(false);
            setNewExerciseTitle("");
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally {
            setIsLoader(false);
        }

    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {topic &&
                    <div className='createTopicPage'>
                        <div className='createTopicPage__title'>
                            <div className='createTopicPage__title__name'>Название темы: </div>
                            <div className='createTopicPage__title__input'>
                                <Input
                                    type="text"
                                    border="border"
                                    value={title}
                                    onChange={(event) => updateTopicName(event.target.value)}
                                    name="newLogin"
                                    rules={{ required: "Required field" }} />
                            </div>
                        </div>

                        <div className='createTopicPage__description'>
                            <div className='createTopicPage__description__name'>
                                Теория
                            </div>

                            {editorStateDescription && <div className='createTopicPage__description__editor'>
                                <EditorBlock updateText={updateTextDescription} editorState={editorStateDescription} />
                            </div>}
                        </div>

                        <div className='createTopicPage__examples'>
                            <div className='createTopicPage__examples__name'>
                                Примеры
                            </div>

                            <div>
                                {examples && examples.map(example =>
                                    <div className='createTopicPage__examples__example'>
                                        <Block key={example._id} title={example.title} navigate={`/factorycourses/${params.courseId}/topic/${topic._id}/example/${example._id}`} />
                                    </div>
                                )}
                            </div>

                            <div className='createTopicPage__examples__button'>
                                <Button onClick={() => setShowNewExample(true)} value='Добавить пример' />
                            </div>
                        </div>
                        <div className='createTopicPage__exercises'>
                            <div className='createTopicPage__exercises__name'>
                                Упражнения
                            </div>

                            <div>
                                {exercises && exercises.map(exercise =>
                                    <div className='createTopicPage__exercises__exercise'>
                                        <Block key={exercise._id} title={exercise.title} navigate={`/factorycourses/${params.courseId}/topic/${topic._id}/exercise/${exercise._id}`} />
                                    </div>
                                )}
                            </div>

                            <div className='createTopicPage__exercises__button'>
                                <Button onClick={() => setShowNewExercise(true)} value='Добавить упражнение' />
                            </div>
                        </div>
                    </div>
                }
            </PageContent>

            <PopupWindow title="Добавить название примера" open={showNewExample}>
                <div className='coursesPage__popupWindow__input'>
                    <Input
                        label="Введите название примера"
                        type="text"
                        border="border"
                        value={newExampleTitle}
                        onChange={(event) => setNewExampleTitle(event.target.value)}
                        name="newExampleTitle" />
                </div>
                <div className='coursesPage__popupWindow__button'>
                    <Button onClick={() => createNewExample()} value='Создать' />
                    <Button onClick={() => setShowNewExample(false)} color='red' value='Отмена' />
                </div>
            </PopupWindow>

            <PopupWindow title="Добавить название упражнения" open={showNewExercise}>
                <div className='coursesPage__popupWindow__input'>
                    <Input
                        label="Введите название упражнения"
                        type="text"
                        border="border"
                        value={newExerciseTitle}
                        onChange={(event) => setNewExerciseTitle(event.target.value)}
                        name="newExampleTitle" />
                </div>
                <div className='coursesPage__popupWindow__button'>
                    <Button onClick={() => createNewExercise()} value='Создать' />
                    <Button onClick={() => setShowNewExercise(false)} color='red' value='Отмена' />
                </div>
            </PopupWindow>

            <Loader show={isLoaded} />
        </>
    );
}