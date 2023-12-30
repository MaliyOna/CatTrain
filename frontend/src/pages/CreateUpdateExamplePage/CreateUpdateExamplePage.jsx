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

export function CreateUpdateExamplePage() {
    const [example, setExample] = useState(null);
    const [title, setTitle] = useState("");
    const [editorStateDescription, setEditorStateDescription] = useState(null);
    const [exampleHTML, setExampleHTML] = useState("");
    const [exampleCSS, setExampleCSS] = useState("");

    const params = useParams();

    const iframeContent = `
    <html>
      <head>
        <style>${exampleCSS}</style>
      </head>
      <body>
        ${exampleHTML}
      </body>
    </html>
  `;

    useEffect(() => {
        loadInformation();
    }, [])

    async function loadInformation() {
        const data = await getExampleById(params.exampleId);
        console.log(data);
        setExample(data.data)
        setTitle(data.data.title);
        setExampleHTML(data.data.codeHTML.code);
        setExampleCSS(data.data.codeCSS.code);

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

    async function updateExampleName(value) {
        setTitle(value);
        await updateExampleTitle(params.exampleId, value);
    }

    async function updateTextDescription(state) {
        setEditorStateDescription(state);
        const data = convertToRaw(state.getCurrentContent());
        const dataJson = JSON.stringify(data);
        await updateExampleDescription(params.exampleId, dataJson);
    }

    async function updateExampleHTMLClick(value) {
        setExampleHTML(value);
        await updateExampleCode(example.codeHTML._id, value);
    }

    async function updateExampleCssClick(value) {
        setExampleCSS(value)
        await updateExampleCode(example.codeCSS._id, value);
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
                                <iframe srcDoc={iframeContent} title="Preview" style={{ width: '100%', height: '400px', border: '1px solid white' }} />
                            </div>
                        </div>
                    </div>
                }
            </PageContent>
        </>
    );
}