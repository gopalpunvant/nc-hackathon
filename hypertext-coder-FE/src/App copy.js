import logo from './logo.svg';
import './App.css';
import fsExtra from "fs-extra";

function App() {

 const createProject = (sourceFolder, destinationFolder) => {
    try {
      fsExtra.copySync(sourceFolder, destinationFolder);
      console.log("Folder copied successfully.");
    } catch (error) {
      console.error("Error copying folder:", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HyperText Coder
        </p>
        <button className="App-gen-btn" onClick={createProject("../templates/project", "../demo-app")}>
          Create Project
        </button>
      </header>
    </div>
  );
}

export default App;
