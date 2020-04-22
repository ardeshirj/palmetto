# Palmetto
A coding challenge from Palmetto.

## Overview
This is a simple React app that will take a city name to fetch current weather forecast information using [OpenWeatherAPI](https://openweathermap.org/). The following tools has been used to build & test this app:
- [Create React App](https://github.com/facebook/create-react-app)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material Design Component for React](https://github.com/material-components/material-components-web-react)
- [Jest](https://jestjs.io/)

## Get Started
To run this app, you first need an api key from `OpenWeatherAPI`. You can simply generate one on their website. Once you have your API key, you would need to add it to `.env` file in main directory under `REACT_APP_API_KEY` environment variable. Now you can run the app simply by using `yarn`:
```
yarn install
yarn start
```

## Test
The are some tests in `features/weather` directory, and you can run the tests using `yarn`:
```
yarn test
```

## Build
There is build command to build this app for production:
```
yarn build
```

## Improvement
- Add autocomplete for city name
- Add CI/CD integration to build, test and deploy
- Add logs service
