import React, { useEffect, useState } from 'react';
import './ExercisePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { useParams } from 'react-router-dom';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { SyntaxHighlighterLanguage } from '../../shared/components/SyntaxHighlighterLanguage/SyntaxHighlighterLanguage';
import { FrameContent } from '../../shared/components/FrameContent/FrameContent';
import { getExerciseById } from '../../shared/api/exerciseApi';
import { CodeEditor } from '../../shared/components/CodeEditor/CodeEditor';
import { Button } from '../../shared/components/Button/Button';
import { PopupWindow } from '../../shared/components/PopupWindow/PopupWindow';
import { addExerciseToUserTopic } from '../../shared/api/courseApi';

export function ExercisePage() {
    const [exercise, setExercise] = useState(null);
    const [title, setTitle] = useState("");
    const [editorStateDescription, setEditorStateDescription] = useState(null);
    const [exampleHTML, setExampleHTML] = useState("");
    const [exampleCSS, setExampleCSS] = useState("");
    const [showCheckResult, setShowCheckResult] = useState(false);
    const [resultText, setResultText] = useState(false);

    const params = useParams();

    useEffect(() => {
        loadInformation();
    }, [])

    async function loadInformation() {
        const data = await getExerciseById(params.exerciseId);
        setExercise(data.data)
        setTitle(data.data.title);
        setExampleHTML(data.data.startCodeHTML.code);
        setExampleCSS(data.data.startCodeCSS.code);

        const descriptionData = data.data.description;
        loadDescriptionEditor(descriptionData);
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

    function updateExampleHTMLClick(value) {
        setExampleHTML(value);
    }

    function updateExampleCssClick(value) {
        setExampleCSS(value)
    }

    
    async function checkExerciseClick() {
        const resultHTML = exercise.rightCodeHTML.code === exampleHTML;
        const resultCSS = exercise.rightCodeCSS.code === exampleCSS;

        console.log(exercise.rightCodeHTML.code)
        console.log(exampleHTML)
        console.log(exercise.rightCodeCSS.code)
        console.log(exampleCSS)


        if (resultHTML && resultCSS) {
            setResultText(true);
            setShowCheckResult(true);
            await addExerciseToUserTopic(params.topicId, localStorage.getItem('userName'), params.exerciseId)
        }
        else {
            setResultText(false)
            setShowCheckResult(true);
        }
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {exercise &&
                    <div className='exercisePage'>
                        <div className='exercisePage__title'>Название упражнения: {title}</div>
                        <div className='exercisePage__description'>
                            <div className='exercisePage__description__name'>Описание</div>

                            <EditorBlock editorState={editorStateDescription} />
                        </div>

                        <div className='exercisePage__html'>
                            <div className='exercisePage__html__title'>HTML</div>

                            <div className='exercisePage__html__code'>
                                <CodeEditor
                                    example={exampleHTML}
                                    onUpdateExample={(exampleHTML) => updateExampleHTMLClick(exampleHTML)}
                                    lang="html" />
                            </div>
                        </div>

                        <div className='exercisePage__css'>
                            <div className='exercisePage__css__title'>CSS</div>

                            <div className='exercisePage__css__code'>
                                <CodeEditor
                                    example={exampleCSS}
                                    onUpdateExample={(exampleCSS) => updateExampleCssClick(exampleCSS)}
                                    lang="css" />
                            </div>
                        </div>

                        <div>
                            <FrameContent exampleCSS={exampleCSS} exampleHTML={exampleHTML} />
                        </div>

                        <div className='exercisePage__checkButton'>
                            <Button onClick={() => checkExerciseClick()} value='Проверить' />
                        </div>
                    </div>
                }
            </PageContent>
            
            <PopupWindow title="Результат проверки" open={showCheckResult}>
                {resultText ? "Упражнение решено правильно" : "В упражнении допущена ошибка"}
                <Button onClick={() => setShowCheckResult(false)} value="Закрыть"/>
            </PopupWindow>
        </>
    );
}