import "./App.css";
import axios from "axios";
import { useState } from "react";
import mermaid from "mermaid";
import { UxHeader } from "@netcracker/ux-react";
import { design } from "./mermaid/designInput"; // Update the path to your design input
import { JsonEditor as Editor } from "jsoneditor-react";
import { input } from "./mermaid/designInput"; // Update the path to your design input
import "jsoneditor-react/es/editor.min.css";
import MermaidComponent from "./MermaidComponent";
import ClassDiagramComponent from "./mermaid/ClassDiagramComponent";
import { UxButton } from "@netcracker/ux-react";

function App() {
  const { Logo } = UxHeader;
  const [yourJson, setYourJson] = useState(input);
  mermaid.initialize({ startOnLoad: true });

  const createProject = () => {
    axios
      .get("/createProject")
      .then((response) => {
        alert("New Project is created.");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deployProject = () => {
    axios
      .get("/deployProject")
      .then((response) => {
        alert("Project is deployed.");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const updateClassDiagram = () => {
    // this.mermaidJson = this.generateMermaidDiagram(JSON.parse(this.jsonData));
    localStorage.setItem("dataSource", yourJson);
    // window.location.reload();
  };

  return (
    <div className="App">
      <UxHeader text={" HyperText Coder"}>
        <Logo />
      </UxHeader>
      <div className="container">
        <MermaidComponent className="editor" />
        <ClassDiagramComponent className="diagram" />
      </div>

      <UxButton onClick={createProject} size="small">
        Create Project
      </UxButton>

      <UxButton onClick={deployProject} size="small">
        Deploy Project
      </UxButton>

      <UxButton onClick={generateCode} size="small">
        Generate Design
      </UxButton>
    </div>
  );
}

export default App;
