import React, {useState} from "react";
import {FC} from "react";
import { DatePicker } from '@mui/lab';
import {TextField, Typography} from "@mui/material";
import CuriosityDisplayer from "../curiosity-displayer";
import Chart from "./chart";
import {EmissionData, Prediction} from "../../views/poland";

interface MainPanelProps {
    year: number|null,
    data: EmissionData[],
    prediction: Prediction,
    country: string,
}

const MainPanel: FC<MainPanelProps> = ({year, data, prediction, country}) => {
    if(year === null) {
        return (
            <div style={{
                width: '70vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{width: '30vw'}}>
                    <CuriosityDisplayer/>
                </div>
            </div>
        );
    }

    return <div style={{width: '70vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{height: '20vh', display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6">
                W {country} w
                <span style={{fontWeight: 'bold'}}> {year}</span> z prawdopodobieństwem
                <span style={{fontWeight: 'bold'}}> {prediction.probability}</span> emisja CO2 wyniesie
                <span style={{fontWeight: 'bold'}}> {prediction.emission}</span>
            </Typography>
        </div>
        <div style={{height: '64vh', width: '70vw'}}>
            <Chart data={data} chosenYear={year} predictedEmission={prediction.emission}/>
        </div>
    </div>
};

export default MainPanel;