import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
const EventPage = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  console.log(value?.format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
  
  return (
      <div className="right-content">
          <div style={{
              borderRadius: 10,
              backgroundColor: 'white',
              padding: 20,

          }}>
              <h3 style={{ fontSize: 18, color: '#403e57' }}>
              </h3>
          </div>
          <div style={{backgroundColor:'white',padding:40}}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
            <Stack spacing={2} sx={{ minWidth: 305 }} >
              <DateTimePicker
                value={value}
                onChange={setValue}
                
                // referenceDate={dayjs('2022-04-17T15:30')}
                
              />
              <Typography>
                Stored value: {value == null ? 'null' : value.format()}
              </Typography>
            </Stack>
          </LocalizationProvider>
          </div>
      </div>
  )
}

export default EventPage