import React, {useEffect, useState} from "react";
import {FC} from "react";
import TopPanel from "../components/top-panel/top-panel";
import SidePanel from "../components/side-panel/side-panel";
import MainPanel from "../components/main-panel/main-panel";
import {fetchPolandPredict, fetchPolandRawData} from "../http/poland";

export interface EmissionData {
    year: number,
    emission: number,
}

export interface Prediction {
    emission: number,
}

const Poland: FC = () => {
    const [year, setYear] = useState<number|null>(null);
    const [data, setData] = useState<EmissionData[]>([]);
    const [prediction, setPrediction] = useState<Prediction>({emission: 0});

    useEffect(() => {
        async function fetchData () {
            const response = await fetchPolandPredict(year!);
            setPrediction({emission: await response.json()});
        }
        
        if(year) {
            fetchData();
        }
    }, [year])

    useEffect(() => {
        async function fetchData () {
            const response = await fetchPolandRawData();
            setData(await response.json());
        }

        fetchData();
    }, []);

    return <div style={{height: '94vh'}}>
        <TopPanel data={data}/>
        <div style={{display: 'flex', height: '84vh', borderTop: '1px solid lightgrey'}}>
            <SidePanel setYear={setYear} minYear={1970} maxYear={2100} />
            <MainPanel year={year} data={data} prediction={prediction} country={"Polsce"}/>
        </div>
    </div>
}

export default Poland;