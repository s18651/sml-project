import React from "react";
import {FC} from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import {EmissionData} from "../../views/poland";

interface ChartProps {
    data: EmissionData[],
    chosenYear: number|null,
    predictedEmission: number|null,
    secondData: EmissionData[],
    firstName: string,
    secondName?: string,
}

const Chart: FC<ChartProps> = ({data, chosenYear, predictedEmission, secondData, firstName, secondName = ''}) => {
    const preparedData: EmissionData[] = (!!chosenYear && chosenYear > data[data.length-1].year) ?
        [...data, {year: chosenYear!, emission: predictedEmission!}]
        : data
    ;

    if(secondData.length > 0) {
        preparedData.forEach((item1, index) => {
            // @ts-ignore
            preparedData[index]['emission2'] = secondData.filter(item2 => item2.year === item1.year)[0].emission
        })
    }

    return (
      // @ts-ignore
      <ResponsiveContainer style={{width: '70vw', height: '84vh'}}>
        <BarChart
            data={preparedData}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
            barGap={0}
            barCategoryGap={'15%'}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="year" label={{ value: 'rok', position: 'insideBottomRight', offset: -10 }} scale="band" />
            <YAxis label={{ value: 'emisja CO2', angle: -90, position: 'insideLeft', offset: -5 }} />
            {/*<Tooltip />*/}
            <Legend />
            {/*<Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />*/}
            {/*<Bar dataKey="emission" label="emisja" barSize={20} fill="#413ea0" />*/}
            <Bar dataKey="emission" fill="#413ea0" name={firstName}>
                {
                    preparedData.map((entry: any, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.year === chosenYear ? (secondData.length > 0 ? 'white' : '#e59400') : '#413ea0'}
                            strokeWidth={entry.year === chosenYear ? 3 : 0}
                            stroke={entry.year === chosenYear ? (secondData.length > 0 ? '#413ea0' : '#e59400') : ""}
                        />
                    ))
                }
            </Bar>
            {secondData.length > 0 &&
                <Bar dataKey="emission2" fill="#A9815F" name={secondName}>
                    {
                        preparedData.map((entry: any, index) => (
                            <Cell
                                key={`cell2-${index}`}
                                fill={entry.year === chosenYear ? 'white' : '#e59400'}
                                strokeWidth={entry.year === chosenYear ? 3 : 0}
                                stroke={entry.year === chosenYear ? "#e59400" : ""}
                            />
                        ))
                    }
                </Bar>
            }
            {/*<Line type="monotone" dataKey="uv" stroke="#ff7300" />*/}
        </BarChart>
      </ResponsiveContainer>
  );
}

export default Chart;