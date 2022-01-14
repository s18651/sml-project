import React from "react";
import {FC} from "react";
import {
    Area,
    Bar,
    CartesianGrid,
    Cell,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {EmissionData} from "../../views/poland";

interface ChartProps {
    data: EmissionData[],
    chosenYear: number,
    predictedEmission: number|null,
}

const Chart: FC<ChartProps> = ({data, chosenYear, predictedEmission}) => {
    const preparedData: EmissionData[] = chosenYear > data[data.length-1].year ? [...data, {year: chosenYear, emission: predictedEmission!}] : data;
    return (
      // @ts-ignore
      <ResponsiveContainer style={{width: '70vw', height: '84vh'}}>
        <ComposedChart
            data={preparedData}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="year" label={{ value: 'rok', position: 'insideBottomRight', offset: -10 }} scale="band" />
            <YAxis label={{ value: 'emisja CO2', angle: -90, position: 'insideLeft', offset: -5 }} />
            {/*<Tooltip />*/}
            {/*<Legend />*/}
            {/*<Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />*/}
            {/*<Bar dataKey="emission" label="emisja" barSize={20} fill="#413ea0" />*/}
            <Bar dataKey="emission" label="emisja" barSize={20} fill="#aaae00">
                {
                    preparedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.year === chosenYear ? '#F68E5F' : '#413ea0'} />
                    ))
                }
            </Bar>
            {/*<Line type="monotone" dataKey="uv" stroke="#ff7300" />*/}
        </ComposedChart>
      </ResponsiveContainer>
  );
}

export default Chart;