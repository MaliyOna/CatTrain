import React from 'react';
import './FrameContent.scss';

export function FrameContent(props) {
    const iframeContent = `
    <html>
      <head>
        <style>${props.exampleCSS}</style>
      </head>
      <body>
        ${props.exampleHTML}
      </body>
    </html>
  `;

    return (
        <div className='frameContent'>
            <iframe srcDoc={iframeContent} title="Preview" style={{ width: '100%', height: '400px', border: '1px solid white' }} />
        </div>
    );
}