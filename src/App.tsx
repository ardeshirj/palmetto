import React from 'react';
import { useDispatch } from 'react-redux';
import '@material/react-text-field/dist/text-field.min.css';
import '@material/react-button/dist/button.min.css';
import '@material/react-material-icon/dist/material-icon.css';

import './App.css';
import { Weather } from './features/weather/Weather';
import { loadForecast, fetchForecast } from './features/weather/weatherSlice';

function App() {
  const dispatch = useDispatch();

  const onLoadForecast = (location: string) => {
    dispatch(loadForecast(location));
    dispatch(fetchForecast(location));
  }

  return (
    <div className="App">
      <Weather loadForecast={onLoadForecast}></Weather>
    </div>
  );
}

export default App;
