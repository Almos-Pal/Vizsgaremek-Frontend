"use client";

import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styles from "./MusclePieChart.module.scss";
import { Text } from "@/components/server";
import { groupIzomcsoportCounts } from "@/utils";

interface MusclePieChartProps {
  data: Record<number, number>[];
}

const MusclePieChart: React.FC<MusclePieChartProps> = ({ data }) => {
  const groupedData = groupIzomcsoportCounts(data[0]);

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return null;
  }


  const totalValue = groupedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.container}>
      <Text className={styles.title} variant="h4">
        Edzett izmok aránya
      </Text>

      <PieChart
        className={styles["pieChart"]}
        width={isMobile ? 265 : 400}
        height={isMobile ? 250 : 250}
      >
        <Pie
          data={groupedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={isMobile ? 70 : 90}
          labelLine={false}
          stroke="none"
        >
          {groupedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
          ))}
        </Pie>


        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { name, value } = payload[0].payload;
              const percentage = ((value / totalValue) * 100).toFixed(1);
              return (
                <div className={styles.tooltip}>
                  <Text>{name}: {percentage}%</Text>
                </div>
              );
            }
            return null;
          }}
        />

        <Legend
          className={styles["legend"]}
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          content={({ payload }) => (
            <ul className={styles.legendList}>
              {payload?.map((entry, index) => (
                <li key={`legend-item-${index}`}>
                  <span
                    style={{
                      backgroundColor: entry.color,

                      fontSize: 16,

                      display: "inline-block",
                      marginRight: 5,
                    }}
                  ></span>


                  {entry.value}
                </li>
              ))}
            </ul>
          )}
        />




      </PieChart>
    </div>
  );
};

export default MusclePieChart;
