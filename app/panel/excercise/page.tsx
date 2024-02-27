"use client";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

const Excercise = () => {
  const [html, setHtml] = useState("");
  const [javascript, setJavascript] = useState("");
  const [css, setCss] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const updatePreview = () => {
      const doc = `
        <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            ${javascript}
          </script>
        </body>
        </html>`;
      setPreview(doc);
    };
    updatePreview();
  }, [html, css, javascript]);

  const handleHtmlChange = (value: any) => {
    setHtml(value);
  };

  const handleCssChange = (value: any) => {
    setCss(value);
  };
  const handleJavascriptChange = (value: any) => {
    setJavascript(value);
  };
  return (
    <div className="px-[3%] grid grid-cols-1 gap-2">
      <div className="grid grid-cols-3">
        <div className="editor-container">
          <label htmlFor="css-editor">کد CSS:</label>
          <AceEditor
            mode="css"
            theme="monokai"
            value={css}
            onChange={handleCssChange}
            height="300px"
            width="100%"
            editorProps={{ $blockScrolling: true }}
            name="css"
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
        <div className="editor-container">
          <label htmlFor="html-editor">کد HTML:</label>
          <AceEditor
            mode="html"
            theme="monokai"
            value={html}
            onChange={handleHtmlChange}
            height="300px"
            width="100%"
            editorProps={{ $blockScrolling: true }}
            name="html"
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
        <div className="editor-container">
          <label htmlFor="javascript-editor">کد JavaScript:</label>
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={javascript}
            onChange={handleJavascriptChange}
            height="300px"
            width="100%"
            editorProps={{ $blockScrolling: true }}
            name="javascript"
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
      <div className="w-full border my-2 rounded-2xl">
        <iframe srcDoc={preview} title="پیش نمایش" height="300" width="100%" />
      </div>
    </div>
  );
};

export default Excercise;
