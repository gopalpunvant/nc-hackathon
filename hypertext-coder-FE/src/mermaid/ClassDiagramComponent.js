import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import { input } from "./designInput"; // Update the path to your design input

const ClassDiagramComponent = () => {
  const [mermaidText, setMermaidText] = useState("");

  useEffect(() => {
    const generatedMermaidText = generateMermaidDiagram(input.design);
    setMermaidText(generatedMermaidText);

    mermaid.initialize({ startOnLoad: true });
  }, []);

  const generateMermaidDiagram = (jsonData) => {
    let mermaidText = "classDiagram\n"; // Adding the 'classDiagram' keyword

    jsonData.forEach((classInfo) => {
      mermaidText += `class ${classInfo.name}\n`;
      classInfo.properties.forEach(
        (prop) => (mermaidText += `  ${classInfo.name} : ${prop}\n`)
      );
      classInfo.methods.forEach(
        (method) => (mermaidText += `  ${classInfo.name} : ${method}\n`)
      );
    });

    jsonData.forEach((classInfo) => {
      if (classInfo.parent) {
        // Check if 'props' is defined in the current classInfo
        if (classInfo.props) {
          mermaidText += `view_configuration -- |> ${classInfo.name} : ${classInfo.props}\n`;
        } else {
          mermaidText += `${classInfo.parent} -- |> ${classInfo.name}\n`;
        }
      }
    });

    return mermaidText;
  };

  return <div className="mermaid">{mermaidText}</div>;
};

export default ClassDiagramComponent;
