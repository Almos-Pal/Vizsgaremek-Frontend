"use client";
import React, { useEffect, useState } from "react";
import { Button, Weight } from "../../index";
import { Icons, Text } from "@/components/server";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { groupIzomcsoportCounts } from "@/utils";

import styles from './Stats.module.scss';
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEdzes } from "@/hooks";
import { useSession } from "next-auth/react";
import { UseQueryResult } from "@tanstack/react-query";
import { EdzesStatsResponse } from "@/types";



function Stats() {
    const { data: session } = useSession();
    
      let userId = session?.user?.user_id || 0;
    const searchParams = useSearchParams();
    const filteredValues = searchParams.get("type") || "week";
    
    const { data } = useEdzes.getEdzesByType(userId, filteredValues) as unknown as UseQueryResult<EdzesStatsResponse, Error>;

    
    const groupedData = groupIzomcsoportCounts(data?.meta.izomcsoportCounts as Record<string, number> || {});

    
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
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[500px]   max-w-[325px] flex flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="mb-5 flex items-center justify-center w-full  " >
                <Text variant="h4" className="max-w-[500px] text-center">Heti Statisztikák</Text>
            </div>
            <div className={styles.flexContainer}>

                <div className={clsx(styles.humanDiv, "max-w-[220px]  max-h-[130px] sm:min-h[130px]  min-w-[130px] w-full sm:ml-0  rounded-lg")}>

                <Weight dashboard weight={data?.meta.totalWeight} />
                </div>

                <div className={clsx(styles.humanDiv, "max-w-[220px]  max-h-[130px]  min-w-[130px] w-full sm:ml-0  rounded-lg")}>

            <div className={styles.pieChartContainer}>

                    <PieChart
                        className={styles["pieChart"]}
                        width={200} height={160}
                    >
                        <Pie
                            data={groupedData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
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

            </div>
            <div className="flex justify-center mt-5">
                <Button color={"secondary"} href={"/statisztika"} rightIcon="SearchIcon" >Statisztikák</Button>
            </div>
        </div>
    )
}
export default Stats;