import React, { useEffect, useState } from 'react';
import './EditorBlock.scss';
import { Editor } from 'react-draft-wysiwyg';

export function EditorBlock(props) {
    const [openEditButton, setOpenEditButton] = useState("openButton");
    const [openEditEditor, setOpenEditEditor] = useState("openEditor");

    useEffect(() => {

    }, [props.editorState])

    async function handleOpenCloseEditor() {
        if (openEditButton === "openButton") {
            setOpenEditButton("closeButton");
            setOpenEditEditor("closeEditor");
        } else {
            setOpenEditButton("openButton");
            setOpenEditEditor("openEditor");
        }
    }

    return (
        <>
            <div className={`editorBlock__openEditor ${openEditButton}`} onClick={handleOpenCloseEditor}>
                ❮
            </div>
            <div className='editorBlock__editor'>
                <Editor
                    toolbarClassName={`editorBlock__editor__toolbar ${openEditEditor}`}
                    onEditorStateChange={props.updateText}
                    editorState={props.editorState}
                />
            </div>
        </>
    );
}
