"use client";
import { Button } from "../../index";
import { BodySVG, Text } from "@/components/server";
import styles from './TodaysWorkout.module.scss';
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useEdzes, useIsMobile } from "@/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GyakorlatWithSets } from "@/types";

function TodaysWorkout() {
    const router = useRouter();
    const { data: session } = useSession();
    const currentDate = useMemo(() => new Date().toISOString(), []);
    const { data: todaysWorkout } = useEdzes.findOneByDate(session?.user.user_id!, currentDate);
    const [view, setView] = useState<"front" | "back">("front");
    const isMobile = useIsMobile();

    const avgRep = (gyakorlat: any): number => {
      const sets = gyakorlat.szettek || [];
      if (sets.length === 0) return 0;
      
      const totalRep = sets.reduce((acc:any, set:any) => acc + Number(set.reps || 0), 0);
      return parseFloat((totalRep / sets.length).toFixed(0));
    };
    
    

    const foIzomcsoportok = todaysWorkout?.gyakorlatok.flatMap(gyakorlat =>
        gyakorlat.gyakorlat.fo_izomcsoport
    ) || [];

    const izomcsoportok = todaysWorkout?.gyakorlatok.flatMap(gyakorlat =>
        gyakorlat.gyakorlat.izomcsoportok.map(izomcsoport => izomcsoport.izomcsoport_id)
    ) || [];

    const handleViewToggle = () => {
        setView(prev => prev === "front" ? "back" : "front");
    };

    const exercises = todaysWorkout?.gyakorlatok || [];
    const remainingExercises = exercises.length > (isMobile ? 3 : 4) ? 
        exercises.length - (isMobile ? 3 : 4) : 0;

    if (!exercises.length) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <Text variant="h3">Még nincs edzés a mai napra</Text>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Text variant="h4">Mai Edzés</Text>
            </div>

            <div className={styles.content}>
                <div className={styles.exerciseSection}>
                    <div className={styles.exerciseList}>
                        {exercises.slice(0, isMobile ? 3 : 4).map((item) => (
                            <div key={item.gyakorlat_id} className={styles.exerciseItem}>
                                <Text variant="body-16">{item.gyakorlat.gyakorlat_neve}</Text>
                                <Text variant="body-16">
                                    {item.total_sets}x{avgRep(item) || 0}
                                </Text>
                            </div>
                        ))}
                        {remainingExercises > 0 && (
                            <Link 
                                href={`/edzes/${todaysWorkout?.edzes_id}`} 
                                className={styles.moreExercises}
                            >
                                  további {remainingExercises}...
                            </Link>
                        )}
                    </div>
                    <Button 
                        additionalClassName={styles.workoutButton}
                        color="secondary"
                        href={`/edzes/${todaysWorkout?.edzes_id}`}
                    >
                      {remainingExercises > 0?  `További gyakorlatok (${remainingExercises})` : "Edzés megtekintése"}
                    </Button>
                </div>

                <div className={styles.bodySection}>
                    <div className={styles.bodyWrapper}>
                        <div className={styles.bodyBackground} />
                        <Button 
                            onClick={handleViewToggle}
                            color="secondary"
                            iconOnly
                            iconProps={{ size: 24 }}
                            leftIcon="ArrowLeftIcon"
                            additionalClassName={`${styles.viewButton} ${styles.leftButton}`}
                        />
                        <BodySVG
                            size={220}
                            view={view}
                            selectedMuscleIds={foIzomcsoportok}
                            secondaryMuscleIds={izomcsoportok}
                        />
                        <Button 
                            onClick={handleViewToggle}
                            color="secondary"
                            iconOnly
                            leftIcon="ArrowRightIcon"
                            iconProps={{ size: 24 }}
                            additionalClassName={`${styles.viewButton} ${styles.rightButton}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodaysWorkout;
