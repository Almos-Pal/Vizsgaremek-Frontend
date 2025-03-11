"use client";

import { Button, MusclePieChart, ProgressChart, RecordCard, StatFilter, UnderLinedText, Weight } from "@/components/client";
import { useEdzes, useUserGyakorlat } from "@/hooks";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { EdzesStatsResponse } from "@/types/edzes"; // Import your new interface
import { UseQueryResult } from "@tanstack/react-query";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Text } from "@/components/server"
import styles from "./page.module.scss"

const Statistics: React.FC = () => {
  const queryParams = new URLSearchParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  let userId = session?.user?.user_id || 0;
  const filteredValues = searchParams.get("type") || "all";

  const { data } = useEdzes.getEdzesByType(userId, filteredValues) as unknown as UseQueryResult<EdzesStatsResponse, Error>;

  const handleFilterChange = (values: any) => {
    if (values) {
      const updatedParams = new URLSearchParams(window.location.search);
      updatedParams.set("type", values);

      router.push(`?${updatedParams.toString()}`, { scroll: false });
    }
  };
  0


  const { data: records, isLoading } = useUserGyakorlat.getRecords({
    isRecord: true,
    userId,
  });



  return (



    <ContentLayout header="Statisztikák">
      <div className={styles.container}>


        <div className={styles["rekordok"]}>
          <Text style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem "}} variant="h4">Rekordok</Text>
          <div className={` flex flex-row gap-6 mb-12 flex-wrap justify-center`}>
            {records && records.items.map((record) => (
              <div key={record.gyakorlat.gyakorlat_neve}>
                <RecordCard record={record} />
              </div>
            ))}
          </div>
            <div className={styles["rekord-button"]}><Button href={"/rekordok"} rightIcon="SearchIcon" color="secondary" >Több rekord</Button></div>

        </div>

        <div className={styles["filter"]}>
          
          <UnderLinedText lineLength={250} text="Szűrés" />
          <StatFilter onFilterChange={handleFilterChange} />
        </div>


        <div className={styles["chart-container"]}>
          <ProgressChart />
          {!data?.meta && <h2>JELENLEG NINCSENEK ADATOK</h2>}
        </div>

        {data?.meta && (
          <div className={styles["double-trouble"]}>
            <div className={styles.pieChart}>
              <MusclePieChart data={[data.meta.izomcsoportCounts]} />
            </div>

            <div className={styles.weight}>
              <Weight weight={data.meta.totalWeight} />
            </div>
          </div>
        )}
      </div>
    </ContentLayout>


  );
};

export default Statistics;
