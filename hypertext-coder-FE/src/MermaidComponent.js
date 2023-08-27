import React, { useState, useEffect } from "react";
import MermaidRender from "./MermaidComponent"; // Assuming you have a MermaidRender component
import { design, input } from "./mermaid/designInput"; // Update the path to your design input
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import "./MermaidComponent.css";
import { UxButton } from "@netcracker/ux-react";
import axios from "axios";

const MermaidComponent = () => {
  const [jsonData, setJsonData] = useState(input);
  const [mermaidJson, setMermaidJson] = useState();

  useEffect(() => {
    const storedData = localStorage.getItem("dataSource");
    if (storedData) {
      setJsonData(JSON.stringify(JSON.parse(storedData), null, 2));
      setMermaidJson(generateMermaidDiagram(JSON.parse(storedData)));
    } else {
      setJsonData(input);
      setMermaidJson(generateMermaidDiagram(jsonData));
    }
  }, []);

  useEffect(() => {
    setMermaidJson(generateMermaidDiagram(jsonData));
  }, [jsonData, mermaidJson]);

  const loadData = () => {};

  const updateClassDiagram = () => {
    setMermaidJson(generateMermaidDiagram(jsonData));
    const jsonString = JSON.stringify(jsonData);
    localStorage.setItem("dataSource", jsonString);
    window.location.reload();
  };

  const reset = () => {
    localStorage.removeItem("dataSource");
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

  const generateCode = (jsonData) => {
    axios
      .post("/generateCode", jsonData)
      .then((response) => {
        alert("Code is generateCode.");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onMouseOut = () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copy to clipboard";
  };

  const generateMermaidDiagram = (jsonDataPara) => {
    console.log("in generate", typeof jsonDataPara);
    let mermaidText = "classDiagram\n";
    jsonDataPara = Object.assign([], jsonDataPara);
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
    console.log("mermaidText", mermaidText);
    return mermaidText;
  };

  return (
    <div>
      <div className="editorClass">
        {" "}
        <Editor
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
        />
      </div>

      <br />
      <div></div>

      <UxButton
        onClick={generateCode(jsonData)}
        className="generate"
        size="small"
      >
        Generate Code
      </UxButton>
    </div>
  );
};

export default MermaidComponent;
