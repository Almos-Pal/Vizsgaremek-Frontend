"use client";
import { Button } from "../../index";
import { BodySVG, Text } from "@/components/server";
import styles from './WeeklyTotal.module.scss';
import Link from "next/link";
import { useEdzes, useViewportSize } from "@/hooks";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

function WeeklyTotal() {
  const { data: session } = useSession();
  const { data: currentWeekEdzesek } = useEdzes.getCurrentWeekEdzesek( session?.user.user_id! );

  const viewportSize = useViewportSize();
  console.log("Current Week Edzesek:", viewportSize);
    
  // Dynamically set BodySVG size based on viewport
  const bodySvgSize = useMemo(() => {
    switch(viewportSize) {
      case 'mobile':
        return 180;
      case 'tablet':
        return 200;
      case 'midDesktop':
        return 155; // Smaller for the problematic range
      case 'desktop':
      default:
        return 220;
    }
  }, [viewportSize]);

  return (
    <div  className={styles.mainDiv}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <Text variant="h4">Heti Összesítő</Text>
        </div>
      </div>
      <div className={styles.humanDiv}>
        <Link href="/heti-edzes" className={styles.link}>

          <BodySVG  size={bodySvgSize}  selectedMuscleIds={currentWeekEdzesek?.fo_izomcsoportok } secondaryMuscleIds={currentWeekEdzesek?.izomcsoportok} />
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Button color="secondary" additionalClassName={styles.button} href="/heti-edzes">
          Több a hetemről
        </Button>
      </div>
    </div>
  );
}

export default WeeklyTotal;
