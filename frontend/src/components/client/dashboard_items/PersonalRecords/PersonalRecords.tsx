"use client";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from "./PersonalRecords.module.scss";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useUserGyakorlat } from "@/hooks";
import { Loading } from "../../Loading/Loading";
import { useError } from "@/contexts/ErrorContext";

function PersonalRecords() {
  const { data: session } = useSession();
  const { setError } = useError();
  const userId = session?.user?.user_id;

  const {
    data: records,
    isLoading,
    isError,
  } = useUserGyakorlat.getRecords({
    isRecord: true,
    userId,
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError, setError]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading hasParent />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div
      id="mainDiv"
      className={clsx(
        styles.mainDiv,
        "sm:max-w-[540px] max-w-[325px] w-full flex flex-col m-2.5 p-5 rounded-lg "
      )}
    >
      <div className="mb-5 flex justify-center">
        <Text variant="h4" className="max-w-[500px] text-center">
          Rekordok
        </Text>
      </div>
      <div className="max-w-[540px] hidden sm:grid  max-h-[100 px] grid grid-cols-2 gap-1 ml-2">
        {records?.items.slice(0, 6).map((item) => (
          <div
            className={clsx(styles.item, "flex flex-row justify-between ")}
            key={item.gyakorlat.gyakorlat_neve}
          >
            <div className={styles.textLeft}>
              <Text variant="body-16">{item.gyakorlat.gyakorlat_neve}:</Text>
            </div>
            <div className={styles.textRight}>
              <Text variant="body-16">
                <span className={styles.greenify}>{item.personal_best} kg</span>
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-[500px] sm:hidden visible grid grid-cols-1 gap-5 ml-0 mb-5">
        {records?.items.slice(0, 3).map((item) => (
          <div
            className="flex flex-row gap-0 justify-between"
            key={item.gyakorlat.gyakorlat_neve}
          >
            <div className="text-left">
              <Text variant="body-16">{item.gyakorlat.gyakorlat_neve}:</Text>
            </div>
            <div className="text-right min-w-[60px]">
              <Text variant="body-16">
                <span className={styles.greenify}>{item.personal_best} kg</span>
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className={clsx(styles.button, "flex justify-center")}>
        {records?.meta.totalItems !== 0 ? (
          <Button color={"secondary"} href={"/rekordok"} rightIcon="SearchIcon">
            További Rekordok{" "}
          </Button>
        ) : (
          <Text variant="h5" className={styles["no-record-text"]}>
            Jelenleg még nincsenek rekordjai
          </Text>
        )}
      </div>
    </div>
  );
}
export default PersonalRecords;
