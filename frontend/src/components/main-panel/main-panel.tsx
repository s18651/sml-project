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
    secondData?: EmissionData[],
    secondCountry?: string,
}

const MainPanel: FC<MainPanelProps> = ({year, data, prediction, country, secondData = [], secondCountry}) => {
    if(data.length === 0) {
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

    const diff = secondData.length > 0 && year ? secondData.filter(item => item.year === year)[0].emission/data.filter(item => item.year === year)[0].emission : null;

    return <div style={{width: '70vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{height: '20vh', display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6">
                { (year && year >= 1970 && !secondCountry) || diff === 1 ? <>
                W {country} w
                <span style={{fontWeight: 'bold'}}> {year}</span> emisja CO2 {year! > 2012 ? 'wyniesie ' : 'wyniosła '}
                <span style={{fontWeight: 'bold'}}>{parseFloat(prediction.emission as unknown as string).toFixed(2)}</span> ton CO2
                </> : ''}
                { year && year >= 1970 && secondCountry && diff !== 1 ? <>
                W
                <span style={{fontWeight: 'bold'}}> {year} </span>
                    emisja CO2 w {country} była <span style={{fontWeight: 'bold'}}>
                    {diff! < 1 ? parseFloat(1/diff! as unknown as string).toFixed(2) : parseFloat(diff as unknown as string).toFixed(2)}</span> razy
                    {diff! > 1 ? ' mniejsza ' : ' większa ' }
                    niż w {secondCountry}
                </> : ''}
            </Typography>
        </div>
        <div style={{height: '64vh', width: '70vw'}}>
            <Chart
                data={data}
                chosenYear={year}
                predictedEmission={prediction.emission}
                secondData={secondData}
                firstName={country}
                secondName={secondCountry}
            />
        </div>
    </div>
};

export default MainPanel;