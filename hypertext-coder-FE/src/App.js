import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import mermaid from 'mermaid';
import { UxHeader } from '@netcracker/ux-react';
import { design } from './mermaid/designInput'; // Update the path to your design input
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import MermaidComponent from './MermaidComponent';

function App() {

  const { Logo } = UxHeader;
  const [yourJson, setYourJson] = useState(design);
  mermaid.initialize({ startOnLoad: true });

  const input = {
    "xtype": "h1",
    "value": "Student Details",
    "childrens": [
      {
        "xtype": "text",
        "displayField": "Name",
        "valueField": "name"
      },
      {
        "xtype": "text",
        "displayField": "Class",
        "valueField": "class"
      },
      {
        "xtype": "text",
        "displayField": "School Name",
        "valueField": "schoolName"
      },
      {
        "xtype": "text",
        "displayField": "Address",
        "valueField": "address"
      }
    ]
  };

  const createProject = () => {
    axios.get('/createProject')
      .then(response => {
        alert('New Project is created.');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const generateCode = () => {
    axios.post('/generateCode', input)
      .then(response => {
        alert('Code is generateCode.');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const deployProject = () => {
    axios.get('/deployProject')
      .then(response => {
        alert('Project is deployed.');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const updateClassDiagram = () => {
    // this.mermaidJson = this.generateMermaidDiagram(JSON.parse(this.jsonData));
    localStorage.setItem('dataSource', yourJson);
    // window.location.reload();
  }

  return (
    <div className="App">
        <UxHeader text={' HyperText Coder'}>
        <Logo />
      </UxHeader>
      {/* <div className="container">
      <div className="App">
            <Editor value={yourJson} />
      </div>
        <ClassDiagramComponent />
      </div> */}

      <MermaidComponent/>
        <button className="App-gen-btn" onClick={() => createProject()}>
          Create Project
        </button>
        
        <button className="App-gen-btn" onClick={() => generateCode()}>
          Generate Code
        </button>

        <button className="App-gen-btn" onClick={() => deployProject()}>
          Deploy Project
        </button>

        <button className="App-gen-btn" onClick={updateClassDiagram}>Generate Design</button>
    </div>
  );
}

export default App;
