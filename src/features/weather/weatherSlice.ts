import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { getForecast, Forecast } from '../../api/weatherAPI';

interface WeatherState {
  isLoadingForecast: boolean;
  location: string | null;
  forecast: Forecast | null;
  error: string | null;
}

const initialState: WeatherState = {
  isLoadingForecast: false,
  location: null,
  forecast: null,
  error: null
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    loadForecast: (state, app: PayloadAction<string>) => {
      state.isLoadingForecast = true;
      state.location = app.payload;
      state.forecast = null;
    },
    getForecastSuccess: (state, action: PayloadAction<Forecast>) => {
      state.isLoadingForecast = false;
      state.forecast = action.payload;
    },
    getForecastFailed: (state, action: PayloadAction<string>) => {
      state.isLoadingForecast = false;
      state.error = action.payload
    }
  },
});

export const {
  loadForecast,
  getForecastSuccess,
  getForecastFailed
} = weatherSlice.actions;

export const selectLocation = (state: RootState) => state.weather.forecast;

export default weatherSlice.reducer;

export const fetchForecast = (location: string): AppThunk => async dispatch => {
  try {
    const forecast = await getForecast(location);
    dispatch(getForecastSuccess(forecast));
  } catch (error) {
    dispatch(getForecastFailed(error.toString()));
  }
}
