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
    const [prediction, setPrediction] = useState<Prediction>({emission: 21370});

    useEffect(() => {
        async function fetchData () {
            const response = await fetchContinentPredict(continentId!, year!);
            setPrediction({emission: await response.json()});
        }
        
        if(year && continentId) {
            fetchData();
        }
    }, [year, continentId])

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
        <TopPanel data={data}/>
        <div style={{display: 'flex', height: '84vh', borderTop: '1px solid lightgrey'}}>
            <SidePanel
                setYear={setYear}
                minYear={1970}
                maxYear={2100}
                setNext={setContinentId}
                nextOptions={continents}
                chosenNext={continentId}
                nextLabel={"Wybierz kontynent aby przeprowadzić predykcję"}
                nextType={"kontynent"}
            />
            <MainPanel year={year} data={data} prediction={prediction} country={continentId ? continents[parseInt(continentId)].label : ''}/>
        </div>
    </div>
}

export default Continents;

const continents = [
    {id: '0', label: 'Europa'},
    {id: '1', label: 'Azja'},
    {id: '2', label: 'Afryka'},
    {id: '3', label: 'Australia i Oceania'},
    {id: '4', label: 'Ameryka Północna'},
    {id: '5', label: 'Ameryka Południowa'},
    {id: '6', label: 'Antarktyda'},
];