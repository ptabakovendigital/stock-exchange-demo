import { useState, useEffect } from 'react';
import {
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
    Legend,
    YAxis,
    XAxis,
  } from "recharts";

export default function CompanyChart(props: any) {
    
    const [chartData, setChartData] = useState<any[] | undefined>([]);
    
    useEffect(() => {
        
        let mappedData : any[] = [];
                
        props.data.forEach(function (dataItem: any[]) {
            const chartItem = {
                date: dataItem[0],
                price: dataItem[11]
            };        
            mappedData.push(chartItem)            
          });          
          setChartData(mappedData);
      }, [props.data])

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart width={730} height={250} data={chartData}
                margin={{ top: 15, right: 0, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="price" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#1976d2" />                
            </LineChart>
        </ResponsiveContainer>
    )
}