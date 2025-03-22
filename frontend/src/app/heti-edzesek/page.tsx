"use client"

import { Button, EdzesBlock, SubHeader } from "@/components/client"
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout"
import styles from './page.module.scss'
import { BodySVG } from "@/components/server"
import { useSession } from "next-auth/react"
import { useEdzes } from "@/hooks"
import { Text } from "@/components/server"
import { useRouter } from "next/navigation";
import { Loading } from "@/components/client/Loading/Loading"


const WeeklyTrainingPage = () => {
    const { data: session } = useSession();
    const { data: currentWeekEdzesek, isLoading } = useEdzes.getCurrentWeekEdzesek( session?.user.user_id! );
    const router = useRouter();

    if(isLoading) {
        return (
            <ContentLayout 
            header="Heti Edzések" 
            >   
            <div className="flex justify-center items-center flex-col ">
                <Loading  hasParent/>
            </div>
            </ContentLayout>
        )
    }

    if(currentWeekEdzesek?.edzesek.length === 0) {
    return (
        <ContentLayout 
        header="Heti Edzések" 
        >   
        <div className="flex justify-center items-center flex-col gap-4 text-center">

            <Text variant="h5">Jelenleg nincsen edzésed a hétre</Text>
            <Button additionalClassName={styles.button}color="primary" onClick={()=> router.back()}>Vissza</Button>
        </div>
        </ContentLayout>
    )
    }

    return (
        <ContentLayout 
        header="Heti Edzések" 
        >

         
        <div className="flex justify-center items-center flex-col">
            <div className={styles.container}>

        <SubHeader header="A héten érintett izomcsoportok"/>
            </div>

            <div className={styles.imageDiv}>

            <BodySVG  size={330}  selectedMuscleIds={currentWeekEdzesek?.fo_izomcsoportok } secondaryMuscleIds={currentWeekEdzesek?.izomcsoportok} />
            </div>
            {currentWeekEdzesek?.edzesek?.map((edzes: any) => (
                <EdzesBlock key={edzes.edzes_id} edzes={edzes} />
            ))}
          
            <Button additionalClassName={styles.button}color="primary" onClick={()=> router.back()}>Vissza</Button>
            </div>
          

      
        </ContentLayout>
    )
}
export default WeeklyTrainingPage