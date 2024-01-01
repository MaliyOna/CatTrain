import React, { useEffect, useState } from 'react';
import './CreateUpdateExamplePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { getExampleById, updateExampleDescription } from '../../shared/api/exampleApi';
import { useParams } from 'react-router-dom';
import { Input } from '../../shared/components/Input/Input';
import { updateExampleTitle } from '../../shared/api/exampleApi';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { CodeEditor } from '../../shared/components/CodeEditor/CodeEditor';
import { updateExampleCode } from '../../shared/api/codeApi';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';
import { FrameContent } from '../../shared/components/FrameContent/FrameContent';

export function CreateUpdateExamplePage() {
    const [example, setExample] = useState(null);
    const [title, setTitle] = useState("");
    const [editorStateDescription, setEditorStateDescription] = useState(null);
    const [exampleHTML, setExampleHTML] = useState("");
    const [exampleCSS, setExampleCSS] = useState("");
    const [isLoaded, setIsLoader] = useState(false);

    const params = useParams();

    useEffect(() => {
        loadInformation();
    }, [])

    async function loadInformation() {
        setIsLoader(true);
        try {
            const data = await getExampleById(params.exampleId);
            setExample(data.data)
            setTitle(data.data.title);
            setExampleHTML(data.data.codeHTML.code);
            setExampleCSS(data.data.codeCSS.code);

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

    async function updateExampleName(value) {
        try {
            setTitle(value);
            await updateExampleTitle(params.exampleId, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateTextDescription(state) {
        try {
            setEditorStateDescription(state);
            const data = convertToRaw(state.getCurrentContent());
            const dataJson = JSON.stringify(data);
            await updateExampleDescription(params.exampleId, dataJson);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateExampleHTMLClick(value) {
        try {
            setExampleHTML(value);
            await updateExampleCode(example.codeHTML._id, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    async function updateExampleCssClick(value) {
        try {
            setExampleCSS(value)
            await updateExampleCode(example.codeCSS._id, value);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {example &&
                    <div className='createExamplePage'>
                        <div className='createExamplePage__title'>
                            <div className='createExamplePage__title__name'>Название:</div>
                            <div className='createExamplePage__title__input'>
                                <Input
                                    type="text"
                                    border="border"
                                    value={title}
                                    onChange={(event) => updateExampleName(event.target.value)}
                                    name="newLogin"
                                    rules={{ required: "Required field" }} />
                            </div>
                        </div>

                        <div className='createExamplePage__description'>
                            <div className='createExamplePage__description__name'>Теория</div>

                            <EditorBlock updateText={updateTextDescription} editorState={editorStateDescription} />
                        </div>

                        <div className='createExamplePage__code'>
                            <div className='createExamplePage__code__html'>
                                <div className='createExamplePage__code__html__title'>
                                    HTML
                                </div>

                                <div className='createExamplePage__code__html__editor'>
                                    <CodeEditor
                                        example={exampleHTML}
                                        onUpdateExample={(exampleHTML) => updateExampleHTMLClick(exampleHTML)}
                                        lang="html" />
                                </div>
                            </div>

                            <div className='createExamplePage__code__css'>
                                <div className='createExamplePage__code__css__title'>
                                    CSS
                                </div>

                                <div className='createExamplePage__code__css__editor'>
                                    <CodeEditor
                                        example={exampleCSS}
                                        onUpdateExample={(exampleCSS) => updateExampleCssClick(exampleCSS)}
                                        lang="css" />
                                </div>
                            </div>


                            <div className='createExamplePage__code__block'>
                                <FrameContent exampleCSS={exampleCSS} exampleHTML={exampleHTML} />
                            </div>
                        </div>
                    </div>
                }
            </PageContent>

            <Loader show={isLoaded} />
        </>
    );
}