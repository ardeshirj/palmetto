import axios from 'axios';

export interface Forecast {
  id: number,
  name: string,
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number
  },
  weather: Weather[]

}

interface Weather {
  id: number,
  description: string;
  icon: string;
  main: string;
}

export async function getForecast(location: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&apikey=${process.env.REACT_APP_API_KEY}`
  const { data } = await axios.get<Forecast>(url);
  console.log(data);
  return data;
}
