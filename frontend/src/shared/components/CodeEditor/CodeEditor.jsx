import React from 'react';
import { highlight, languages } from 'prismjs';
import SimpleCodeEditor from 'react-simple-code-editor';
import './CodeEditor.scss';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

export function CodeEditor(props) {
    function updateExample(example) {
        props.onUpdateExample(example)
    }

    return (
        <div className='codeEditor'>
            <SimpleCodeEditor
                value={props.example}
                onValueChange={example => updateExample(example)}
                highlight={(example) => highlight(example, props.lang === "html" ? languages.html : languages.css)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 15,
                    marginLeft: 5,
                    marginTop: 10,
                    marginBottom: 10
                }}
            />
        </div>
    )
}
