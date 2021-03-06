import React, {useEffect, useState} from "react";
import {FC} from "react";
import TopPanel from "../components/top-panel/top-panel";
import SidePanel from "../components/side-panel/side-panel";
import MainPanel from "../components/main-panel/main-panel";
import {fetchPolandPredict, fetchPolandRawData} from "../http/poland";
import {EmissionData, Prediction} from "./poland";
import {fetchContinentPredict, fetchContinentRawData} from "../http/continents";

const Continents: FC = () => {
    const [year, setYear] = useState<number|null>(null);
    const [continentId, setContinentId] = useState<string>('');
    const [data, setData] = useState<EmissionData[]>([]);
    const [prediction, setPrediction] = useState<Prediction>({emission: 0});

    useEffect(() => {
        async function fetchData () {
            const response = await fetchContinentPredict(continentId!, year!);
            const emission = await response.json();
            setPrediction({emission: emission < 0 ? 0 : emission});
        }
        
        if(year && continentId) {
            fetchData();
        }
    }, [year, continentId])

    useEffect(() => {
        if(year! <= 2012 && year! >= 1970 && data.length > 0) {
            setPrediction(data.filter(item => item.year === year)[0]);
        }
    }, [data, year, prediction]);

    useEffect(() => {
        async function fetchData () {
            const response = await fetchContinentRawData(continentId!);
            setData(await response.json());
        }

        if(continentId) {
            fetchData();
        }
    }, [continentId]);

    return <div style={{height: '94vh'}}>
        <TopPanel
            data={data}
            firstName={continentId ? continents.filter(continent => continent.id === continentId)[0].label : ''}
        />
        <div style={{display: 'flex', height: '84vh', borderTop: '1px solid lightgrey'}}>
            <SidePanel
                setYear={setYear}
                minYear={1970}
                maxYear={2100}
                setNext={setContinentId}
                nextOptions={continents}
                chosenNext={continentId}
                nextLabel={"Wybierz kontynent aby przeprowadzi?? predykcj??"}
                nextType={"kontynent"}
            />
            <MainPanel
                year={year}
                data={data}
                prediction={prediction}
                country={continentId ? continents.filter(continent => continent.id === continentId)[0].label : ''}
            />
        </div>
    </div>
}

export default Continents;

const continents = [
    {id: '0', label: 'Afryka'},
    {id: '1', label: 'Azja'},
    {id: '2', label: 'Europa'},
    {id: '3', label: 'Oceania'},
    {id: '4', label: 'Ameryka P????nocna i Centralna'},
    {id: '5', label: 'Ameryka Po??udniowa'},
];