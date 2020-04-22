import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import Card, { CardMedia } from "@material/react-card";
import List, {ListItem, ListItemText} from '@material/react-list';
import styles from './weather.module.css';
import { Forecast } from '../../api/weatherAPI';

interface Props {
  isLoading: boolean;
  error: string | null;
  forecast: Forecast | null;
  onLoadForecast: (location: string) => void
}

export default function Weather({
  isLoading,
  error,
  forecast,
  onLoadForecast
}: Props) {
  const [locationState, setLocationState] = React.useState("");

  const onLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationState(event.target.value);
  };

  const onSend = (event: React.MouseEvent) => {
    onLoadForecast(locationState);
  }

  const getForecastImg = (icon: string) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  return (
    <div>
      <h1>Weather Time!</h1>
      <TextField
        label='Location'
        onTrailingIconSelect={() => setLocationState('')}
      ><Input
          value={locationState}
          onChange={onLocationChange} />
      </TextField>
      <Button
        raised
        data-testid='location-send-btn'
        className={styles.sendButton}
        onClick={onSend} >
          Send
      </Button>
      { isLoading ? <p>Loading...</p> : null}
      { error ? <p>{error}</p> : null}
      {
        forecast ? (
          <div className={styles.forecastContainer}>
            <Card className={styles.forecastCard}>
              <h1 data-testid='forecast-name'>{forecast.name}</h1>
              <CardMedia
                data-testid='forecast-icon'
                square
                imageUrl={getForecastImg(forecast?.weather[0].icon)}
                className={styles.forecastIcon}>
              </CardMedia>
              <List twoLine>
                <ListItem>
                  <ListItemText
                    data-testid='feels-like'
                    className={styles.forecastList}
                    primaryText='Feels Like'
                    secondaryText={forecast.main.feels_like + '°F'} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    data-testid='humidity'
                    className={styles.forecastList}
                    primaryText='Humidity'
                    secondaryText={forecast.main.humidity + '%'} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    data-testid='pressure'
                    className={styles.forecastList}
                    primaryText='Pressure'
                    secondaryText={forecast.main.pressure + ' hPa'}/>
                </ListItem>
                <ListItem>
                  <ListItemText
                    data-testid='temp'
                    className={styles.forecastList}
                    primaryText='Temperature'
                    secondaryText={forecast.main.temp + '°F'} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    data-testid='temp-min'
                    className={styles.forecastList}
                    primaryText='Temperature Min'
                    secondaryText={forecast.main.temp_min + '°F'} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    data-testid='temp-max'
                    className={styles.forecastList}
                    primaryText='Temperature Max'
                    secondaryText={forecast.main.temp_max + '°F'} />
                </ListItem>
              </List>
            </Card>
          </div>
        ) : null
      }
    </div>
  )
}
