import React, {useEffect, useState} from "react";
import {FC} from "react";
import TopPanel from "../components/top-panel/top-panel";
import SidePanel from "../components/side-panel/side-panel";
import MainPanel from "../components/main-panel/main-panel";
import {EmissionData, Prediction} from "./poland";
import {fetchCountryPredict, fetchCountryRawData} from "../http/countries";

const Countries: FC = () => {
    const [year, setYear] = useState<number|null>(null);
    const [countryId, setCountryId] = useState<string>('');
    const [data, setData] = useState<EmissionData[]>([]);
    const [prediction, setPrediction] = useState<Prediction>({emission: 21370});

    useEffect(() => {
        async function fetchData () {
            const response = await fetchCountryPredict(countryId!, year!);
            setPrediction({emission: await response.json()});
        }

        if(year && countryId) {
            fetchData();
        }
    }, [year, countryId])

    useEffect(() => {
        async function fetchData () {
            const response = await fetchCountryRawData(countryId!);
            setData(await response.json());
        }

        if(countryId) {
            fetchData();
        }
    }, [countryId]);

    return <div style={{height: '94vh'}}>
        <TopPanel data={data}/>
        <div style={{display: 'flex', height: '84vh', borderTop: '1px solid lightgrey'}}>
            <SidePanel
                setYear={setYear}
                minYear={1970}
                maxYear={2100}
                setNext={setCountryId}
                nextOptions={countries}
                chosenNext={countryId}
                nextLabel={"Wybierz kraj aby przeprowadzić predykcję"}
                nextType={"kraj"}
            />
            <MainPanel year={year} data={data} prediction={prediction} country={countryId ? countries[parseInt(countryId)].label : ''}/>
        </div>
    </div>
}

export default Countries;

const countries = [
    {id: '0', label: 'Niemcy'},
    {id: '1', label: 'Francja'},
    {id: '2', label: 'Rosja'},
];