import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import styles from './weather.module.css';

interface Props {
  loadForecast: (location: string) => void
}

export function Weather({
  loadForecast
}: Props) {
  const [location, setLocation] = React.useState("");

  const onLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const onSend = (event: React.MouseEvent) => {
    loadForecast(location);
  }

  return (
    <div>
      <h1>Welcome to weather app!</h1>
      <TextField
        label='Location'
        onTrailingIconSelect={() => setLocation('')}
      ><Input
          value={location}
          onChange={onLocationChange} />
      </TextField>
      <Button className={styles.sendButton} onClick={onSend} raised>
          Send
      </Button>
    </div>
  )
}
