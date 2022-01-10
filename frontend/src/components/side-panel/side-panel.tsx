import React, {useEffect, useState} from "react";
import {FC} from "react";
import { DatePicker } from '@mui/lab';
import {TextField, Typography} from "@mui/material";

interface SidePanelProps {
    setYear: Function,
    minYear: number,
    maxYear: number,
}

const SidePanel: FC<SidePanelProps> = ({setYear, minYear, maxYear}) => {
    const [date, setDate] = useState<Date|null>(null);

    useEffect(() => {
        setYear(date === null ? null : date.getFullYear());
    }, [date])

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30vw',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '1px solid lightgrey'
    }}>
        <Typography variant="h5" style={{textAlign: 'center', marginBottom: '50px'}}>
            Wybierz rok aby przeprowadzić predykcję
        </Typography>
        <DatePicker
          views={['year']}
          label="Rok"
          minDate={new Date(minYear+'-01-01')}
          maxDate={new Date(maxYear+'-01-01')}
          value={date}
          onChange={(date) => setDate(date)}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
    </div>
};

export default SidePanel;