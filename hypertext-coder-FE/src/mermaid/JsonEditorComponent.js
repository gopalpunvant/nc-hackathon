import React, { useState } from 'react';
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { design } from './designInput'; // Update the path to your design input


const JsonEditorComponent = () => {

    console.log("json", design)
    const [yourJson, setYourJson] = React.useState(design);
    const handleChange = (e) => {
        const storedData = localStorage.getItem('dataSource');
        if (storedData) {
            const jsonData = JSON.stringify(JSON.parse(storedData), null, 2);
            this.mermaidJson = this.generateMermaidDiagram(JSON.parse(storedData));
        } else {
            const jsonData = JSON.stringify(design, null, 2);
            this.mermaidJson = this.generateMermaidDiagram(JSON.parse(jsonData));
        }
    };
    return (
        <div className="App">
            <Editor value={yourJson} onChange={handleChange} />
        </div>
    );
};

export default JsonEditorComponent;
