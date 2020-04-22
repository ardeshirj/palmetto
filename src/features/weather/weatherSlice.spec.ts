import thunk from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import axios from 'axios';
import weather, {
  initialState,
  loadForecast,
  getForecastSuccess,
  getForecastFailed,
  fetchForecast
} from './weatherSlice';
import { Forecast } from '../../api/weatherAPI';
import { RootState, AppThunk } from '../../app/store';

jest.mock('axios');

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

describe('Thunk Actions', () => {
  const middleware = [thunk];
  const mockStore = createMockStore<RootState, AppThunk>(middleware);
  const store = mockStore();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should call getForecast function', async () => {
    const payload = { name: 'foo' } as Forecast;
    const responseData = { data: payload };
    mockedAxios.get.mockResolvedValue(responseData)
    await store.dispatch(fetchForecast("foo"));
    const actions = store.getActions();
    expect(actions[0]).toEqual(getForecastSuccess(payload));
  });
});
