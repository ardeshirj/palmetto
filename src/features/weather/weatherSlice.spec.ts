import weather, {
  initialState,
  loadForecast,
  getForecastSuccess,
  getForecastFailed,
  fetchForecast
} from './weatherSlice';
import { Forecast } from '../../api/weatherAPI';

describe('weather reducer', () => {
  it('should return default state for undefined action', () => {
    expect(weather(undefined, {} as any)).toEqual(initialState);
  });

  it('should update state for loadForecast', () => {
    expect(weather(initialState, loadForecast('foo'))).toEqual({
      isLoading: true,
      location: 'foo',
      forecast: null,
      error: null,
    });
  });

  it('should update state for getForecastSuccess', () => {
    expect(weather(initialState, getForecastSuccess({ name: 'foo' } as Forecast))).toEqual({
      isLoading: false,
      location: null,
      forecast: { name: 'foo' },
      error: null,
    });
  });

  it('should update state for getForecastFailed', () => {
    const error = new Error('foo').toString();
    expect(weather(initialState, getForecastFailed(error))).toEqual({
      isLoading: false,
      location: null,
      forecast: null,
      error: error,
    });
  });
});
