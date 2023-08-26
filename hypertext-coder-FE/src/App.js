import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const createProject = () => {
    axios.get('/createProject')
      .then(response => {
        alert('New Project is created.')
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
      </header>
    </div>
  );
}

export default App;
