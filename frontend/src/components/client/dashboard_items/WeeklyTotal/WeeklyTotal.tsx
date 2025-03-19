"use client";
import { Button } from "../../index";
import { BodySVG, Text } from "@/components/server";
import styles from './WeeklyTotal.module.scss';
import Link from "next/link";
import { useEdzes } from "@/hooks";
import { useSession } from "next-auth/react";

function WeeklyTotal() {
  const { data: session } = useSession();
  const { data: currentWeekEdzesek } = useEdzes.getCurrentWeekEdzesek( session?.user.user_id! );

  return (
    <div  className={styles.mainDiv}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <Text variant="h4">Heti Összesítő</Text>
        </div>
      </div>
      <div className={styles.humanDiv}>
        <Link href="/heti-edzes" className={styles.link}>

          <BodySVG  size={220}  selectedMuscleIds={currentWeekEdzesek?.fo_izomcsoportok } secondaryMuscleIds={currentWeekEdzesek?.izomcsoportok} />
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Button color="secondary" additionalClassName="button" href="/heti-edzes">
          Több a hetemről
        </Button>
      </div>
    </div>
  );
}

export default WeeklyTotal;
