"use client"

import { EdzesBlock, SubHeader } from "@/components/client"
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout"
import styles from './page.module.scss'
import { BodySVG } from "@/components/server"
import { useSession } from "next-auth/react"
import { useEdzes } from "@/hooks"

const WeeklyTrainingPage = () => {
    const { data: session } = useSession();
    const { data: currentWeekEdzesek } = useEdzes.getCurrentWeekEdzesek( session?.user.user_id! );

    return (
        <ContentLayout 
        header="Heti Edzések" 
        >
            <div className={styles.subheader}>

            </div>
        <div className="flex justify-center items-center flex-col">
            <div className={styles.container}>

        <SubHeader header="A héten érintett izomcsoportok"/>
            </div>

            <div className={styles.imageDiv}>

            <BodySVG  size={330}  selectedMuscleIds={currentWeekEdzesek?.fo_izomcsoportok } secondaryMuscleIds={currentWeekEdzesek?.izomcsoportok} />
            </div>
        </div>
            {currentWeekEdzesek?.edzesek?.map((edzes: any) => (
                <EdzesBlock key={edzes.edzes_id} edzes={edzes} />
            ))}
      
        </ContentLayout>
    )
}
export default WeeklyTrainingPage