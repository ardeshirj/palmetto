import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import Card, { CardMedia } from "@material/react-card";
import List, {ListItem, ListItemText} from '@material/react-list';
import styles from './weather.module.css';
import { Forecast } from '../../api/weatherAPI';

interface Props {
  forecast: Forecast | null;
  loadForecast: (location: string) => void
}

export function Weather({
  forecast,
  loadForecast
}: Props) {
  const [locationState, setLocationState] = React.useState("");

  const onLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationState(event.target.value);
  };

  const onSend = (event: React.MouseEvent) => {
    loadForecast(locationState);
  }

  const getForecastImg = (icon: string) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  return (
    <div>
      <h1>Welcome to weather app!</h1>
      <TextField
        label='Location'
        onTrailingIconSelect={() => setLocationState('')}
      ><Input
          value={locationState}
          onChange={onLocationChange} />
      </TextField>
      <Button className={styles.sendButton} onClick={onSend} raised>
          Send
      </Button>
      {
        forecast ? (
          <div className={styles.forecastContainer}>
            <Card className={styles.forecastCard}>
              <h1>{forecast.name}</h1>
              <CardMedia
                square
                imageUrl={getForecastImg(forecast?.weather[0].icon)}
                className={styles.forecastIcon}>
              </CardMedia>
              <List twoLine>
                <ListItem>
                  <ListItemText
                    className={styles.forecastList}
                    primaryText='Feels Like'
                    secondaryText={forecast.main.feels_like + '°F'} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={styles.forecastList}
                    primaryText='Humidity'
                    secondaryText={forecast.main.humidity + '%'} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={styles.forecastList}
                    primaryText='Pressure'
                    secondaryText={forecast.main.pressure + ' hPa'}/>
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={styles.forecastList}
                    primaryText='Temperature'
                    secondaryText={forecast.main.temp + '°F'} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={styles.forecastList}
                    primaryText='Temperature Min'
                    secondaryText={forecast.main.temp_min + '°F'} />
                </ListItem>
                <ListItem>
                  <ListItemText
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
