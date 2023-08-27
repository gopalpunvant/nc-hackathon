import React, { useState, useEffect } from 'react';
import MermaidRender from './MermaidComponent'; // Assuming you have a MermaidRender component
import { design } from './mermaid/designInput'; // Update the path to your design input
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";


const MermaidComponent = () => {
  const [jsonData, setJsonData] = useState(design);
  const [mermaidJson, setMermaidJson] = useState();

  useEffect(() => {
    const storedData = localStorage.getItem('dataSource');
    if (storedData) {
      setJsonData(JSON.stringify(JSON.parse(storedData), null, 2));
      setMermaidJson(generateMermaidDiagram(JSON.parse(storedData)));
    } else {
      setJsonData(design);
      setMermaidJson(generateMermaidDiagram(jsonData));

    }
  }, []);

  useEffect(() => {
    setMermaidJson(generateMermaidDiagram(jsonData));
  }, [jsonData, mermaidJson]);
  

  const loadData = () => {
   
  };

  const updateClassDiagram = () => {
    setMermaidJson(generateMermaidDiagram(jsonData));
    const jsonString = JSON.stringify(jsonData);
    localStorage.setItem('dataSource', jsonString);
    window.location.reload();
  };

  const reset = () => {
    localStorage.removeItem('dataSource');
    window.location.reload();
  };

  const copyToClipboard = () => {
    const copyText = document.getElementById("inputTextArea");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copied";
  };

  const onMouseOut = () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copy to clipboard";
  };

  const generateMermaidDiagram = (jsonDataPara) => {
    console.log("in generate",typeof jsonDataPara)
    let mermaidText = 'classDiagram\n';
    jsonDataPara = Object.assign([],jsonDataPara);
    jsonDataPara.forEach((classInfo) => {
      mermaidText += `class ${classInfo.name}\n`;
      classInfo.properties.forEach(
        (prop) => (mermaidText += `  ${classInfo.name} : ${prop}\n`)
      );
      classInfo.methods.forEach(
        (method) => (mermaidText += `  ${classInfo.name} : ${method}\n`)
      );
    });
    jsonDataPara.forEach((classInfo) => {
      if (classInfo.parent) {
        if (classInfo.props) {
          mermaidText += `view_configuration -- |> ${classInfo.name} : ${classInfo.props}\n`;
        } else {
          mermaidText += `${classInfo.parent} -- |> ${classInfo.name}\n`;
        }
      }
    });
    console.log("mermaidText",mermaidText)
    return mermaidText;
  };

  return (
    <div>
       <Editor value={jsonData}  onChange={(e) => setJsonData(e.target.value)} />
      <br />
      <button onClick={updateClassDiagram}>Generate Class Diagram</button>
      <button onClick={reset}>Reset to Default</button>
      <div className="tooltip">
        <button onClick={copyToClipboard} onMouseOut={onMouseOut}>
          <span className="tooltiptext" id="tooltip">
            Copy to clipboard
          </span>
          Copy text
        </button>
      </div>

      {/* <MermaidRender classJson={mermaidJson} /> */}
    </div>
  );
};

export default MermaidComponent;