import React from "react";
import {FC} from "react";
import {Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {EmissionData} from "../../views/poland";

// const data = [
//   {
//     name: 'Page A',
//     uv: 590,
//     pv: 800,
//     amt: 1400,
//   },
//   {
//     name: 'Page B',
//     uv: 868,
//     pv: 967,
//     amt: 1506,
//   },
//   {
//     name: 'Page C',
//     uv: 1397,
//     pv: 1098,
//     amt: 989,
//   },
//   {
//     name: 'Page D',
//     uv: 1480,
//     pv: 1200,
//     amt: 1228,
//   },
//   {
//     name: 'Page E',
//     uv: 1520,
//     pv: 1108,
//     amt: 1100,
//   },
//   {
//     name: 'Page F',
//     uv: 1400,
//     pv: 680,
//     amt: 1700,
//   },
// ];

interface ChartProps {
  data: EmissionData[],
}

const Chart: FC<ChartProps> = ({data}) => {
  return (
      // @ts-ignore
      <ResponsiveContainer style={{width: '70vw', height: '84vh'}}>
        <ComposedChart
            data={data}
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
            <Bar dataKey="emission" label="emisja" barSize={20} fill="#413ea0" />
            {/*<Line type="monotone" dataKey="uv" stroke="#ff7300" />*/}
        </ComposedChart>
      </ResponsiveContainer>
  );
}

export default Chart;