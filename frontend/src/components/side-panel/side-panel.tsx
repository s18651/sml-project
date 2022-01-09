import React, {useState} from "react";
import {FC} from "react";
import { DatePicker } from '@mui/lab';
import {TextField, Typography} from "@mui/material";

const SidePanel: FC = () => {
    const [date, setDate] = useState<Date|null>(null);

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30vw',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '1px solid lightgrey'
    }}>
        <Typography variant="h5" style={{textAlign: 'center', marginBottom: '50px'}}>Wybierz rok aby rozpocząć przewidywanie</Typography>
        <DatePicker
          views={['year']}
          label="Rok"
          minDate={new Date('2022-01-01')}
          maxDate={new Date('2100-01-01')}
          value={date}
          onChange={(date) => setDate(date)}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
    </div>
};

export default SidePanel;