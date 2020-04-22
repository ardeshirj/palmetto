import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { getForecast, Forecast } from '../../api/weatherAPI';

interface WeatherState {
  isLoading: boolean;
  location: string | null;
  forecast: Forecast | null;
  error: string | null;
}

const initialState: WeatherState = {
  isLoading: false,
  location: null,
  forecast: null,
  error: null
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    loadForecast: (state, app: PayloadAction<string>) => {
      state.isLoading = true;
      state.location = app.payload;
      state.forecast = null;
      state.error = null;
    },
    getForecastSuccess: (state, action: PayloadAction<Forecast>) => {
      state.isLoading = false;
      state.forecast = action.payload;
      state.error = null;
    },
    getForecastFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
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
