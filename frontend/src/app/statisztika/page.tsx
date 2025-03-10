"use client";

import { MusclePieChart, ProgressChart, StatFilter, UnderLinedText, Weight } from "@/components/client";
import { useEdzes } from "@/hooks";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { EdzesStatsResponse } from "@/types/edzes"; // Import your new interface
import { UseQueryResult } from "@tanstack/react-query";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";

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


  console.log("ez a data az intervallumos data:", data);

  return (


    <ContentLayout>
      <div style={{marginLeft: '0.5 rem'}}>
        <UnderLinedText  lineLength={250} text="Szűrés" />
      </div>
      <StatFilter onFilterChange={handleFilterChange} />
      <ProgressChart />

      {data?.meta && (
        <>
          <Weight weight={data.meta.totalWeight} />
          <MusclePieChart data={[data.meta.izomcsoportCounts]} />
        </>
      )}

    </ContentLayout>


  );
};

export default Statistics;
