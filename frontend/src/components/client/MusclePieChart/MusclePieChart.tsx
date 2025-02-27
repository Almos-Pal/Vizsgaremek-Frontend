"use client"

import React, { useEffect, useState } from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts'
import styles from  './MusclePieChart.module.scss'
import { Text} from '@/components/server'





interface MusclePieChartProps {
    data: Record<string, number>[]
}

const COLORS = [
  "#004a5f",
  "#226375",
  "#277389",
  "#c5ebe5",
  "#6db4a9",
];

const MusclePieChart: React.FC<MusclePieChartProps> = ({ data }) => {

    const transformedIzomcsoportCounts = Object.entries(data[0]).map(([key, value]) => ({
        name: key,
        value: value,
       
    }))


    const [isClient, setIsClient] = useState(false);
    console.log("My Data")
    console.log(transformedIzomcsoportCounts)
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return null;
    }
    

    return (
        <div className={styles.container}>
          <Text className={styles.title} variant="h4">
            Edzett izmok aránya
          </Text>
          <PieChart className={styles["pieChart"]} width={400} height={250}>
            <Pie
              data={transformedIzomcsoportCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              labelLine={false}
              stroke='none'
            >
              {transformedIzomcsoportCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
              ))}
            </Pie>
    
            
            <Legend
            className={styles["legend"]}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ color: "#fff" }}
            />
          </PieChart>
        </div>
      );
}

export default MusclePieChart