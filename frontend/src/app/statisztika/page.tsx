"use client";

import {
  Button,
  MusclePieChart,
  ProgressChart,
  RecordCard,
  StatFilter,
  UnderLinedText,
  Weight,
} from "@/components/client";
import { useEdzes, useUserGyakorlat } from "@/hooks";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { EdzesStatsResponse } from "@/types/edzes";
import { UseQueryResult } from "@tanstack/react-query";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Text } from "@/components/server";
import styles from "./page.module.scss";
import { Loading } from "@/components/client/Loading/Loading";
import { ErrorProvider, useError } from "@/contexts/ErrorContext";
import ErrorPage from "@/components/client/ErrorPage/Error";

function StatisticsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const userId = session?.user?.user_id;
  const { setError } = useError();

  // Only fetch data when we have a userId
  const {
    data: records,
    isLoading: isRecordLoading,
    isError: isRecordError,
  } = useUserGyakorlat.getRecords({
    isRecord: true,
    userId: userId || undefined,
    limit: 6,
  });

  const filteredValues = searchParams.get("type") || "all";

  const {
    data,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useEdzes.getEdzesByType(
    userId || 0,
    filteredValues
  ) as unknown as UseQueryResult<EdzesStatsResponse, Error>;

  const { hasError } = useError();

  useEffect(() => {
    if (isRecordError || isStatsError) {
      setError(true);
    }
  }, [isRecordError, isStatsError, setError]);

  if (hasError) {
    return <ErrorPage />;
  }

  const handleFilterChange = (values: any) => {
    if (values) {
      const updatedParams = new URLSearchParams(window.location.search);
      updatedParams.set("type", values);
      router.push(`?${updatedParams.toString()}`, { scroll: false });
    }
  };

  // Show loading state while session is loading
  if (sessionStatus === "loading") {
    return (
      <ContentLayout header="Statisztikák">
        <div className={styles.container}>
          <div className={styles["loading-container-full"]}>
            <Loading hasParent />
          </div>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout header="Statisztikák">
      <div className={styles.container}>
        <div className={styles["rekordok"]}>
          <Text
            style={{
              textAlign: "center",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="h4"
          >
            Rekordok
          </Text>
          <div
            className={styles["records-content"]}
            style={{ minHeight: "400px" }}
          >
            {isRecordLoading || !records ? (
              <div className={styles["loading-container-records"]}>
                <Loading hasParent />
              </div>
            ) : (
              <>
                <div
                  className={`flex flex-row gap-6 mb-12 flex-wrap justify-center`}
                >
                  {records.items.map((record) => (
                    <div key={record.gyakorlat.gyakorlat_neve}>
                      <RecordCard record={record} />
                    </div>
                  ))}
                </div>
                {records.meta.totalItems !== 0 ? (
                  <div className={styles["rekord-button"]}>
                    <Button
                      href={"/rekordok"}
                      rightIcon="SearchIcon"
                      color="secondary"
                    >
                      Több rekord
                    </Button>
                  </div>
                ) : (
                  <Text
                    variant="h2"
                    className="justify-self-center  mt-6 text-center pt-8 px-4"
                  >
                    Jelenleg még nincsenek rekordjai
                  </Text>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles["chart-container"]}>
          <ProgressChart />
        </div>

        <div className={styles["filter"]}>
          <UnderLinedText lineLength={250} text="Szűrés" />
          <StatFilter onFilterChange={handleFilterChange} />
        </div>

        <div className={styles["stats-content"]} style={{ minHeight: "400px" }}>
          {isStatsLoading || !data?.meta ? (
            <div className={styles["loading-container-stats"]}>
              <Loading hasParent />
            </div>
          ) : (
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
      </div>
    </ContentLayout>
  );
}

export default function Statistics() {
  return (
    <ErrorProvider>
      <StatisticsContent />
    </ErrorProvider>
  );
}
