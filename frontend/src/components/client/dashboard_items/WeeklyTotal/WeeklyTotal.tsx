"use client";
import { Button } from "../../index";
import { BodySVG, Text } from "@/components/server";
import styles from "./WeeklyTotal.module.scss";
import Link from "next/link";
import { useEdzes, useViewportSize } from "@/hooks";
import { useSession } from "next-auth/react";
import { useMemo, useEffect } from "react";
import { Loading } from "../../Loading/Loading";
import ErrorPage from "../../ErrorPage/Error";
import { useError } from "@/contexts/ErrorContext";

function WeeklyTotal() {
  const { data: session } = useSession();
  const { setError } = useError();
  const {
    data: currentWeekEdzesek,
    isLoading,
    isError,
  } = useEdzes.getCurrentWeekEdzesek(session?.user.user_id!);

  const viewportSize = useViewportSize();
  console.log("Current Week Edzesek:", viewportSize);

  // Dynamically set BodySVG size based on viewport
  const bodySvgSize = useMemo(() => {
    switch (viewportSize) {
      case "mobile":
        return 180;
      case "tablet":
        return 200;
      case "midDesktop":
        return 155;
      case "desktop":
      default:
        return 220;
    }
  }, [viewportSize]);

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
    <div className={styles.mainDiv}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <Text variant="h4">Heti Összesítő</Text>
        </div>
      </div>
      <div className={styles.humanDiv}>
        <Link href="/heti-edzesek" className={styles.link}>
          <BodySVG
            size={bodySvgSize}
            selectedMuscleIds={currentWeekEdzesek?.fo_izomcsoportok}
            secondaryMuscleIds={currentWeekEdzesek?.izomcsoportok}
          />
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          color="secondary"
          additionalClassName={styles.button}
          href="/heti-edzesek"
        >
          Több a hetemről
        </Button>
      </div>
    </div>
  );
}

export default WeeklyTotal;
