import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

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
    axios.get('/generateCode')
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HyperText Coder
        </p>
        <button className="App-gen-btn" onClick={() => createProject()}>
          Create Project
        </button>
        
        <button className="App-gen-btn" onClick={() => generateCode()}>
          Generate Code
        </button>

        <button className="App-gen-btn" onClick={() => deployProject()}>
          Deploy Project
        </button>
      </header>
    </div>
  );
}

export default App;
