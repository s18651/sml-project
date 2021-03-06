import React, {useEffect, useState} from "react";
import {FC} from "react";
import { DatePicker } from '@mui/lab';
import {FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

interface SidePanelProps {
    yearLabel?: string,
    setYear: Function,
    minYear: number,
    maxYear: number,
    setNext?: Function,
    nextOptions?: {id: string, label: string}[],
    chosenNext?: string,
    nextLabel?: string,
    nextType?: string,
    secondNext?: boolean,
    setSecondNext?: Function,
    chosenSecondNext?: string,
}

const SidePanel: FC<SidePanelProps> = ({
                                           setYear, minYear, maxYear,
                                           setNext, nextOptions,
                                           chosenNext, nextLabel,
                                           nextType, secondNext = false,
                                           setSecondNext, chosenSecondNext,
                                           yearLabel=  'Wybierz rok aby przeprowadzić predykcję'
}) => {
    const [date, setDate] = useState<Date|null>(null);

    useEffect(() => {
        setYear(date === null ? null : date.getFullYear());
    }, [date, setYear])

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30vw',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '1px solid lightgrey'
    }}>
        <Typography variant="h5" style={{textAlign: 'center', marginBottom: '50px'}}>
            {yearLabel}
        </Typography>
        <DatePicker
          views={['year']}
          label="Rok"
          minDate={new Date(minYear+'-01-01')}
          maxDate={new Date(maxYear+'-01-01')}
          value={date}
          onChange={(date) => setDate(date)}
          renderInput={(params) => <TextField {...params} style={{width: '50%'}} helperText={null} />}
        />
        {setNext && nextOptions && nextLabel ?
            <>
                <Typography variant="h5" style={{textAlign: 'center', marginBottom: '50px', marginTop: '50px'}}>
                    {nextLabel}
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    style={{width: '50%'}}
                    value={chosenNext}
                    onChange={({target: {value}}) => {setNext(value)}}
                    displayEmpty
                >
                    <MenuItem disabled value="">
                        <em>Wybierz {nextType}</em>
                    </MenuItem>
                    {nextOptions.map(option =>
                        <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                    )}
                </Select>
            </>
        :null}
        {setNext && nextOptions && nextLabel && secondNext ?
            <>
                <Typography variant="h5" style={{textAlign: 'center', marginBottom: '50px', marginTop: '50px'}}>
                    {nextLabel}
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    style={{width: '50%'}}
                    value={chosenSecondNext}
                    onChange={({target: {value}}) => {setSecondNext!(value)}}
                    displayEmpty
                >
                    <MenuItem disabled value="">
                        <em>Wybierz {nextType}</em>
                    </MenuItem>
                    {nextOptions.map(option =>
                        <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                    )}
                </Select>
            </>
        :null}
    </div>
};

export default SidePanel;