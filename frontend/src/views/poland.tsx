import React, {useEffect, useState} from "react";
import {FC} from "react";
import TopPanel from "../components/top-panel/top-panel";
import SidePanel from "../components/side-panel/side-panel";
import MainPanel from "../components/main-panel/main-panel";
import {fetchPolandRawData} from "../http/poland";

export interface EmissionData {
    year: number,
    emission: number,
}

const Poland: FC = () => {
    const [year, setYear] = useState<number|null>(null);
    const [data, setData] = useState<EmissionData[]>([]);
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
            <SidePanel setYear={setYear}/>
            <MainPanel year={year} data={data}/>
        </div>
    </div>
}

export default Poland;