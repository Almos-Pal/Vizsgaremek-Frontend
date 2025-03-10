"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../index";
import { Icons, Text } from "@/components/server";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { groupIzomcsoportCounts } from "@/utils";

import styles from './Stats.module.scss';
import clsx from "clsx";

//DUMMY DATA
const data = [
    {
        11: 9,
        13: 6,
        12: 4,
        10: 3,
        9: 2,
        1: 2,
        6: 2,
        2: 1,
        4: 1,
        3: 1
    }
]

function Stats() {
    const groupedData = groupIzomcsoportCounts(data[0]);
    console.log("Grouped Data:", groupedData);
    const totalValue = groupedData.reduce((sum, item) => sum + item.value, 0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

    }, []);

    if (!isClient) {
        return null;
    }


    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[500px]  max-w-[325px] w-full flex flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="mb-5">
                <Text variant="h4" className="max-w-[500px] text-center">Statisztika</Text>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between ml-8 sm:ml-0 sm:gap-8 gap-6">

                <div className={clsx(styles.humanDiv, "max-w-[220px]  min-h-[130px] min-w-[130px] w-full sm:ml-0  rounded-lg")}></div>

                <div className={clsx(styles.humanDiv, "max-w-[220px]  min-h-[130px] min-w-[130px] w-full sm:ml-0  rounded-lg")}>


                    <PieChart
                        className={styles["pieChart"]}
                        width={200} height={200}
                    >
                        <Pie
                            data={groupedData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"

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
                    </PieChart>
                </div>

            </div>
            <div className="flex justify-center mt-5">
                <Button color={"secondary"} href={"/statisztika"} rightIcon="SearchIcon" >Statisztikák</Button>
            </div>
        </div>
    )
}
export default Stats;