import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Weather from './Weather';
import { Forecast } from '../../api/weatherAPI';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it("should render weather card", async () => {
  const forecast = {
    name: 'foo',
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d'
      }
    ],
    main: {
      temp: 285.24,
      feels_like: 281.44,
      temp_min: 284.26,
      temp_max: 286.48,
      pressure: 1026,
      humidity: 66
    },
  } as Forecast;

  const loadForecastHandler = jest.fn();

  await act(async () => {
    render(<Weather
      isLoading={false}
      error={null}
      forecast={forecast}
      onLoadForecast={loadForecastHandler}/>, container);
  });

  expect(
    container.querySelector("[data-testid='forecast-name']")?.textContent
  ).toEqual(forecast.name);

  expect(
    (container.querySelector("[data-testid='forecast-icon']") as HTMLDivElement)
      ?.style
      ?.background
  ).toEqual('url(http://openweathermap.org/img/wn/04d@2x.png)');

  expect(
    container.querySelector("[data-testid='feels-like']")
      ?.lastChild
      ?.textContent
  ).toEqual(forecast.main.feels_like + '°F');

  expect(
    container.querySelector("[data-testid='feels-like']")
      ?.lastChild
      ?.textContent
  ).toEqual(forecast.main.feels_like + '°F');

  expect(
    container.querySelector("[data-testid='pressure']")
      ?.lastChild
      ?.textContent
  ).toEqual(forecast.main.pressure + ' hPa');

  expect(
    container.querySelector("[data-testid='temp']")
      ?.lastChild
      ?.textContent
  ).toEqual(forecast.main.temp + '°F');

  expect(
    container.querySelector("[data-testid='temp-min']")
      ?.lastChild
      ?.textContent
  ).toEqual(forecast.main.temp_min + '°F');

  expect(
    container.querySelector("[data-testid='temp-max']")
      ?.lastChild
      ?.textContent
  ).toEqual(forecast.main.temp_max + '°F');
});

it('should trigger on change for send button', async() => {
  const loadForecastHandler = jest.fn();

  await act(async () => {
    render(<Weather
      isLoading={false}
      error={null}
      forecast={null}
      onLoadForecast={loadForecastHandler}/>, container);
  });

  const button = document.querySelector("[data-testid='location-send-btn']")
  expect(button?.firstChild?.textContent).toBe("Send");

  act(() => {
    button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(loadForecastHandler).toHaveBeenCalledTimes(1);
});
