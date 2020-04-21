import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface WeatherState {
  location: string;
}

const initialState: WeatherState = {
  location: "",
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
    }
  },
});

export const { setLocation } = weatherSlice.actions;

export const selectLocation = (state: RootState) => state.weather.location;

export default weatherSlice.reducer;
