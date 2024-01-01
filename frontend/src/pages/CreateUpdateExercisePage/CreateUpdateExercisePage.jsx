import React, { useEffect, useState } from 'react';
import './CreateUpdateExercisePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { useParams } from 'react-router-dom';
import { Input } from '../../shared/components/Input/Input';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { CodeEditor } from '../../shared/components/CodeEditor/CodeEditor';
import { getExerciseById, updateExerciseDescription, updateExerciseTitle } from '../../shared/api/exerciseApi';
import { updateExerciseCode } from '../../shared/api/codeApi';
import { FrameContent } from '../../shared/components/FrameContent/FrameContent';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function CreateUpdateExercisePage() {
    const [exercise, setExercise] = useState(null);
    const [title, setTitle] = useState("");
    const [editorStateDescription, setEditorStateDescription] = useState(null);
    const [startHTML, setStartHTML] = useState("");
    const [startCSS, setStartCSS] = useState("");
    const [rightHTML, setRightHTML] = useState("");
    const [rightCSS, setRightCSS] = useState("");
    const [isLoaded, setIsLoader] = useState(false);

    const params = useParams();

    useEffect(() => {
        loadInformation();
    }, [])

    async function loadInformation() {
        setIsLoader(true);

        try {
            const data = await getExerciseById(params.exerciseId);
            setExercise(data.data)
            setTitle(data.data.title);
            setStartHTML(data.data.startCodeHTML.code);
            setStartCSS(data.data.startCodeCSS.code);
            setRightHTML(data.data.rightCodeHTML.code);
            setRightCSS(data.data.rightCodeCSS.code);

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

    async function updateExerciseName(value) {
        try {
            setTitle(value);
            await updateExerciseTitle(params.exerciseId, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateTextDescription(state) {
        try {
            setEditorStateDescription(state);
            const data = convertToRaw(state.getCurrentContent());
            const dataJson = JSON.stringify(data);
            await updateExerciseDescription(params.exerciseId, dataJson);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateExerciseHTMLClick(value) {
        try {
            setStartHTML(value);
            await updateExerciseCode(exercise.startCodeHTML._id, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateExerciseCssClick(value) {
        try {
            setStartCSS(value)
            await updateExerciseCode(exercise.startCodeCSS._id, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateExerciseRightHTMLClick(value) {
        try {
            setRightHTML(value);
            await updateExerciseCode(exercise.rightCodeHTML._id, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateExerciseRightCssClick(value) {
        try {
            setRightCSS(value)
            await updateExerciseCode(exercise.rightCodeCSS._id, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {exercise &&
                    <div className='createExercisePage'>
                        <div className='createExercisePage__title'>
                            <div className='createExercisePage__title__name'>Название:</div>
                            <div className='createExercisePage__title__input'>
                                <Input
                                    type="text"
                                    border="border"
                                    value={title}
                                    onChange={(event) => updateExerciseName(event.target.value)}
                                    name="newLogin"
                                    rules={{ required: "Required field" }} />
                            </div>
                        </div>

                        <div className='createExercisePage__description'>
                            <div className='createExercisePage__description__name'>Теория</div>

                            <EditorBlock updateText={updateTextDescription} editorState={editorStateDescription} />
                        </div>

                        <div className='createExercisePage__code'>
                            <div className='createExercisePage__code__html'>
                                <div className='createExercisePage__code__html__title'>
                                    Начальный HTML
                                </div>

                                <div className='createExercisePage__code__html__editor'>
                                    <CodeEditor
                                        example={startHTML}
                                        onUpdateExample={(exampleHTML) => updateExerciseHTMLClick(exampleHTML)}
                                        lang="html" />
                                </div>
                            </div>

                            <div className='createExercisePage__code__css'>
                                <div className='createExercisePage__code__css__title'>
                                    Начальный CSS
                                </div>

                                <div className='createExercisePage__code__css__editor'>
                                    <CodeEditor
                                        example={startCSS}
                                        onUpdateExample={(exampleCSS) => updateExerciseCssClick(exampleCSS)}
                                        lang="css" />
                                </div>
                            </div>


                            <div className='createExercisePage__code__block'>
                                <FrameContent exampleCSS={startCSS} exampleHTML={startHTML} />
                            </div>
                        </div>

                        <div className='createExercisePage__code'>
                            <div className='createExercisePage__code__html'>
                                <div className='createExercisePage__code__html__title'>
                                    Решение HTML
                                </div>

                                <div className='createExercisePage__code__html__editor'>
                                    <CodeEditor
                                        example={rightHTML}
                                        onUpdateExample={(exampleHTML) => updateExerciseRightHTMLClick(exampleHTML)}
                                        lang="html" />
                                </div>
                            </div>

                            <div className='createExercisePage__code__css'>
                                <div className='createExercisePage__code__css__title'>
                                    Решение CSS
                                </div>

                                <div className='createExercisePage__code__css__editor'>
                                    <CodeEditor
                                        example={rightCSS}
                                        onUpdateExample={(exampleCSS) => updateExerciseRightCssClick(exampleCSS)}
                                        lang="css" />
                                </div>
                            </div>


                            <div className='createExercisePage__code__block'>
                                <FrameContent exampleCSS={rightCSS} exampleHTML={rightHTML} />
                            </div>
                        </div>
                    </div>
                }
            </PageContent>
            <Loader show={isLoaded} />
        </>
    );
}