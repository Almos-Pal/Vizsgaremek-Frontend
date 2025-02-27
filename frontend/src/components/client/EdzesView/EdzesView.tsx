"use client"

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Edzes } from "@/types/edzes";
import Button from "../Button/Button";
import styles from "./EdzesView.module.scss";
import UnderLinedText from "../UnderLinedText/UnderLinedText";
import GyakorlatComparisonBlock from "../GyakorlatComparisonBlock/GyakorlatComparisonBlock";
import useEdzes from "@/hooks/useEdzes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks";
import ConfirmationModal from "../_modal/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { StopWatch } from "..";
import { BodySVG } from "@/components/server";


interface EdzesViewProps {
    data: Edzes;
}



const EdzesView: React.FC<EdzesViewProps> = ({ data }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const toast = useToast();
    const { mutateAsync: createEdzesAsync } = useEdzes.createEdzes();
    const { mutateAsync: addGyakorlatAsync } = useEdzes.addGyakorlatToEdzes();



    console.log(data.user_id);
    const cloneEdzesWithoutSets = async () => {
        // Create new edzés with same name and no gyakorlatok.
        const newEdzesPayload = {
            edzes_neve: data.edzes_neve,
            datum: new Date(),
            user_id: session?.user.user_id,
            ido: 0
        };



        const currentEdzesID = localStorage.getItem("currentEdzesID");
        currentEdzesID ? localStorage.removeItem("currentEdzesID") : null;
        const storedStartTime = localStorage.getItem("edzesStartTime");
        storedStartTime ? localStorage.removeItem("edzesStartTime") : null;



        const newEdzes = await createEdzesAsync(newEdzesPayload, {
            onSuccess: (newEdzes: any) => {
                console.log("Edzés sikeresen elkezdve");
                toast.success("Edzés sikeresen elkezdve");
            },
            onError: (error: any) => {
                console.error("Error creating edzés:", error);
                toast.error("Hiba történt az edzés létrehozása közben");
            }
        });


        // Add each gyakorlat (without sets) to the new edzés.
        for (const gyakorlat of data.gyakorlatok) {
            await addGyakorlatAsync({
                edzesId: newEdzes.edzes_id,
                userId: session?.user.user_id!,
                gyakorlatId: gyakorlat.gyakorlat_id,
            });
        }


        router.push(`/edzes/${newEdzes.edzes_id}/szerkeszt`);
    };


    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };



    const checkifEdzesIsCurrent = () => {
        if (localStorage.getItem("currentEdzesID") == data.edzes_id.toString() && data.isFinalized == false) {
            console.log("Edzés fut",);
            return <StopWatch />
        }

        return formattedTime;
    }

    const formattedTime = formatTime(data.ido);

    const edzesIzomcsoportok = (edzes: Edzes) => {
        const foIzomcsoportok = new Set<number>();
        const izomcsoportok = new Set<number>();
    
        edzes.gyakorlatok.forEach(gyakorlat => {
            if (gyakorlat.gyakorlat.fo_izomcsoport) {
                foIzomcsoportok.add(gyakorlat.gyakorlat.fo_izomcsoport);
            }
            if (gyakorlat.gyakorlat.izomcsoportok) {
                gyakorlat.gyakorlat.izomcsoportok.forEach((izomcsoport) => izomcsoportok.add(izomcsoport.izomcsoport_id));
            }
        });
    
        return {
            foIzomcsoportok: Array.from(foIzomcsoportok),
            izomcsoportok: Array.from(izomcsoportok)
        };
    };

    const { mutateAsync: deleteEdzesAsync } = useEdzes.deleteEdzes();

    const handleDeleteEdzesConfirm = async () => {
        setIsDeleteEdzesConfirmModalOpen(false);
        try {
            await deleteEdzesAsync(data.edzes_id, {
                onSuccess: () => {
                    console.log("Edzés törölve");
                    toast.success("Edzés törölve");
                },
                onError: (error) => {
                    console.error("Error deleting edzés:", error);
                    toast.error("Hiba történt az edzés törlésekor");
                }
            });

            router.push("/edzes");
        } catch (error) {
            console.error("Error deleting edzés:", error);
            toast.error("Hiba történt az edzés törlésekor");
        }
    };

    const handleOpenDeleteConfirm = () => {
        setIsDeleteEdzesConfirmModalOpen(true);
    }

    const DeleteEdzesConfirmModalCancel = () => {
        setIsDeleteEdzesConfirmModalOpen(false);
    }

    const [isDeleteEdzesConfirmModalOpen, setIsDeleteEdzesConfirmModalOpen] = useState(false);



    return <>
        <ContentLayout header={data.edzes_neve} subheader={checkifEdzesIsCurrent()}>
                      <div className={styles.edzesView}>


                <ConfirmationModal
                    visible={isDeleteEdzesConfirmModalOpen}
                    title="Biztos, hogy törölni akarja ezt a gyakorlatot?"
                    onConfirm={handleDeleteEdzesConfirm}
                    onCancel={DeleteEdzesConfirmModalCancel}
                    confirmText="Igen"
                    cancelText="Nem"
                />
                <div className={styles.buttons}>

                    <div className={styles.doubleButtonDesktop} >
                        {data.isFinalized ? (
                            <Button additionalClassName={styles.singleButtonDesktop} onClick={cloneEdzesWithoutSets} width={420} rightIcon="PlayRightIcon">Új Edzés Kezdése</Button>
                        ) : (
                            <Button additionalClassName={styles.singleButtonDesktop} href={`/edzes/${data.edzes_id}/szerkeszt`} width={420} rightIcon="VisibilityOnIcon">Edzés Folytatása</Button>
                        )}

                        <Button width={420} color="secondary" onClick={handleOpenDeleteConfirm} rightIcon="TrashCanIcon">Törlés</Button>

                    </div>


                    <div className={styles.doubleButtonMobile} >
                        {data.isFinalized ? (
                            <Button additionalClassName={styles.singleButtonMobile} onClick={cloneEdzesWithoutSets} rightIcon="PlayRightIcon">Új Edzés Kezdése</Button>
                        ) : (
                            <Button additionalClassName={styles.singleButtonMobile} href={`/edzes/${data.edzes_id}/szerkeszt`} onClick={cloneEdzesWithoutSets} rightIcon="VisibilityOnIcon">Edzés Folytatása</Button>
                        )}


                        <Button additionalClassName={styles.btnmobileresponsive} onClick={handleOpenDeleteConfirm} color="secondary" rightIcon="TrashCanIcon">Törlés</Button>
                    </div>
                </div>

                <div className={styles.humanContainment}>
                <BodySVG size={'85%'} className={styles["svg"]}  selectedMuscleIds={edzesIzomcsoportok(data).foIzomcsoportok} secondaryMuscleIds={edzesIzomcsoportok(data).izomcsoportok}></BodySVG>

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