"use client"

import React, { useEffect, useState } from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts'
import styles from './MusclePieChart.module.scss'
import { Text } from '@/components/server'
import { groupIzomcsoportCounts } from "@/utils"





interface MusclePieChartProps {
  data: Record<number, number>[];
}

const MusclePieChart: React.FC<MusclePieChartProps> = ({ data }) => {
  const groupedData = groupIzomcsoportCounts(data[0]);

  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const onPieClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };


  const totalValue = groupedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.container}>
      <Text className={styles.title} variant="h4">
        Edzett izmok aránya
      </Text>

      <PieChart className={styles["pieChart"]} width={400} height={250}>
        <Pie
          data={groupedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          labelLine={false}
          stroke="none"
        >
          {groupedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke={index === activeIndex ? "#fff" : "none"}
              strokeWidth={index === activeIndex ? 3 : 1}
              onClick={(event) => onPieClick(event, index)}
            />
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

      {activeIndex !== null && (
        <div className={styles.tooltip}>
          <Text>
            {groupedData[activeIndex].name}:{" "}
            {((groupedData[activeIndex].value / totalValue) * 100).toFixed(1)}%
          </Text>
        </div>
      )}
    </div>
  );
};

export default MusclePieChart;