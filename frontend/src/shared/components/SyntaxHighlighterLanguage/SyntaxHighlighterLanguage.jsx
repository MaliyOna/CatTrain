import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import './SyntaxHighlighterLanguage.scss';

export function SyntaxHighlighterLanguage(props) {
    return (
        <>
            <SyntaxHighlighter language={props.language}>
                {props.code}
            </SyntaxHighlighter>
        </>
    );
}
