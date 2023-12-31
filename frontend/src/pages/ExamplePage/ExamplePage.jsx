import React, { useEffect, useState } from 'react';
import './ExamplePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { getExampleById, updateExampleDescription } from '../../shared/api/exampleApi';
import { useParams } from 'react-router-dom';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { updateExampleCode } from '../../shared/api/codeApi';
import { SyntaxHighlighterLanguage } from '../../shared/components/SyntaxHighlighterLanguage/SyntaxHighlighterLanguage';
import { FrameContent } from '../../shared/components/FrameContent/FrameContent';

export function ExamplePage() {
    const [example, setExample] = useState(null);
    const [title, setTitle] = useState("");
    const [editorStateDescription, setEditorStateDescription] = useState(null);
    const [exampleHTML, setExampleHTML] = useState("");
    const [exampleCSS, setExampleCSS] = useState("");

    const params = useParams();

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


    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {example &&
                    <div className='examplePage'>
                        <div className='examplePage__title'>Название примера: {title}</div>
                        <div className='examplePage__description'>
                            <div className='examplePage__description__name'>Описание</div>

                            <EditorBlock editorState={editorStateDescription} />
                        </div>

                        <div className='examplePage__html'>
                            <div className='examplePage__html__title'>HTML</div>
                            <SyntaxHighlighterLanguage languages="html" code={exampleHTML} />
                        </div>

                        <div className='examplePage_css'>
                            <div className='examplePage__css__title'>CSS</div>
                            <SyntaxHighlighterLanguage languages="css" code={exampleCSS} />
                        </div>

                        <div>
                            <FrameContent exampleCSS={exampleCSS} exampleHTML={exampleHTML}/>
                        </div>
                    </div>
                }
            </PageContent>
        </>
    );
}