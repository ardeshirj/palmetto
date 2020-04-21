import React from 'react';
import './App.css';
import '@material/react-text-field/dist/text-field.min.css';
import '@material/react-button/dist/button.min.css';
import '@material/react-material-icon/dist/material-icon.css';
import { Weather } from './features/weather/Weather';

function App() {
  return (
    <div className="App">
      <Weather></Weather>
    </div>
  );
}

export default App;
