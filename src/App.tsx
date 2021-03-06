import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-text-field/dist/text-field.min.css';
import '@material/react-button/dist/button.min.css';
import '@material/react-card/dist/card.min.css';
import '@material/react-list/dist/list.min.css';

import './App.css';
import Weather from './features/weather/Weather';
import { loadForecast, fetchForecast } from './features/weather/weatherSlice';
import { RootState } from './app/store';

function App() {
  const dispatch = useDispatch();

  const { forecast, isLoading, error } = useSelector(
    (state: RootState) => state.weather
  );

  const loadForecastHandler = (location: string) => {
    dispatch(loadForecast(location));
    dispatch(fetchForecast(location));
  }

  return (
    <div className="App">
      <Weather
        isLoading={isLoading}
        error={error}
        forecast={forecast}
        onLoadForecast={loadForecastHandler}/>
    </div>
  );
}

export default App;
