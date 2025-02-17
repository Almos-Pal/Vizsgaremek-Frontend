"use client"

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Edzes } from "@/types/edzes";
import Button from "../Button/Button";
import styles from "./EdzesView.module.scss";
import UnderLinedText from "../UnderLinedText/UnderLinedText";
import GyakorlatComparisonBlock from "../GyakorlatComparisonBlock/GyakorlatComparisonBlock";
import useEdzes from "@/hooks/useEdzes";
import { useRouter } from "next/navigation";


interface EdzesViewProps {
    data: Edzes;
}



const EdzesView: React.FC<EdzesViewProps> = ({ data }) => {

    const router = useRouter();
    const { mutateAsync: createEdzesAsync } = useEdzes.createEdzes();
    const { mutateAsync: addGyakorlatAsync } = useEdzes.addGyakorlatToEdzes();

    console.log(data.user_id);
    const cloneEdzesWithoutSets = async () => {
        // Create new edzés with same name and no gyakorlatok.
        const newEdzesPayload = {
            edzes_neve: data.edzes_neve,
            datum: new Date(),
            user_id: 1, //HARD CODED USER_ID FIX IN THE FUTURE
            ido: data.ido,
        };

        // Create the new edzés.
        const newEdzes = await createEdzesAsync(newEdzesPayload);

        // Add each gyakorlat (without sets) to the new edzés.
        for (const gyakorlat of data.gyakorlatok) {
            await addGyakorlatAsync({
                edzesId: newEdzes.edzes_id,
                userId: 1, //HARD CODED USER_ID FIX IN THE FUTURE
                gyakorlatId: gyakorlat.gyakorlat_id,
            });
        }

        // Redirect to the edit page of the new edzés.
        router.push(`/edzes/${newEdzes.edzes_id}/szerkeszt`);
    };

    return <>
        <ContentLayout header={data.edzes_neve}>
            <div className={styles.edzesView}>

                <div className={styles.buttons}>



                    <Button additionalClassName={styles.singleButtonDesktop} onClick={cloneEdzesWithoutSets} width={420} rightIcon="PlayRightIcon">Edzés Kezdése</Button>


                    <div className={styles.doubleButtonDesktop} >
                        <Button width={200} color="secondary" rightIcon="EditIcon">Módosítás</Button>
                        <Button width={200} color="secondary" rightIcon="EditIcon">Törlés</Button>
                    </div>

                    <Button additionalClassName={styles.singleButtonMobile} onClick={cloneEdzesWithoutSets} rightIcon="PlayRightIcon">Edzés Kezdése</Button>

                    <div className={styles.doubleButtonMobile} >
                        <Button additionalClassName={styles.btnmobileresponsive} color="secondary" rightIcon="EditIcon">Módosítás</Button>
                        <Button additionalClassName={styles.btnmobileresponsive} color="secondary" rightIcon="EditIcon">Törlés</Button>
                    </div>
                </div>

                <div className={styles.humanContainment}>

                </div>

                <div className={styles.underlinedText}>
                    <UnderLinedText lineLength={220} text="Gyakorlatok"></UnderLinedText>
                </div>

                {data.gyakorlatok.map((gyakorlat) => (
                    <GyakorlatComparisonBlock
                        key={gyakorlat.gyakorlat_id}
                        data={gyakorlat}
                    />
                ))}


            </div>
        </ContentLayout>
    </>
}

export default EdzesView;