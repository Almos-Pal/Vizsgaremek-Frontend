"use client"

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Edzes } from "@/types/edzes";
import Button from "../Button/Button";
import styles from "./EdzesView.module.scss";
import UnderLinedText from "../UnderLinedText/UnderLinedText";
import GyakorlatComparisonBlock from "../GyakorlatComparisonBlock/GyakorlatComparisonBlock";
import useEdzes from "@/hooks/useEdzes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks";
import ConfirmationModal from "../_modal/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { StopWatch } from "..";
import { BodySVG } from "@/components/server";
import { Text } from "@/components/server";

interface EdzesViewProps {
    data: Edzes;
}


const EdzesView: React.FC<EdzesViewProps> = ({ data }) => {
    const { data: session } = useSession();

    const router = useRouter();
    const toast = useToast();
    const { mutateAsync: createEdzesAsync } = useEdzes.createEdzes();
    const { mutateAsync: addGyakorlatAsync } = useEdzes.addGyakorlatToEdzes();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const fromFinalize = searchParams.get('fromFinalize') === 'true';


    const handleBack = () => {
        if (fromFinalize) {
            // If we came from finalize action, go to edzesek list
            router.push('/edzesek');
        } else {
            // Normal back behavior
            router.back();
        }
    };

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


        console.log("Edzés klónozása");

        try {

            const newEdzes = await createEdzesAsync(newEdzesPayload, {
                onSuccess: (newEdzes: any) => {
                    console.log("Edzés sikeresen elkezdve");
                    toast.success("Edzés sikeresen elkezdve");

                },
                onError: (error: any) => {
                    console.log(error)
                    if (error == "Error: 409") {

                        toast.error("A mai nap már van edzés");

                    }
                    else {

                        toast.error("Hiba történt az edzés létrehozása közben");


                    }
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


            router.push(`/edzesek/${newEdzes.edzes_id}/szerkeszt`);
        } catch (error) { }



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

            router.push("/edzesek");
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

    const currentEdzesID = localStorage.getItem("currentEdzesID");
    const isSameAsLocal = currentEdzesID === String(data.edzes_id);
    const isDateToday = isToday(new Date(data.datum));

    const NotTodayEdzes = () => {
        toast.info("A kiválasztott edzés nem a mai napra vonatkozik");
    }

    const renderEdzesButtonDesktop = () => {
        if (data.isFinalized) {
            return (
                <Button additionalClassName={styles.singleButtonDesktop} onClick={cloneEdzesWithoutSets} width={420} rightIcon="PlayRightIcon">
                    Edzés újrahasználása
                </Button>
            );
        } else if (!isDateToday) {
            return (
                <Button additionalClassName={styles.singleButtonDesktop} onClick={NotTodayEdzes} rightIcon="PlayRightIcon" width={420}>
                    Edzés kezdése
                </Button>
            );
        } else if (isSameAsLocal) {
            return (
                <Button additionalClassName={styles.singleButtonDesktop} href={`/edzesek/${data.edzes_id}/szerkeszt`} width={420} rightIcon="VisibilityOnIcon">
                    Edzés folytatása
                </Button>
            );
        } else {
            return (
                <Button additionalClassName={styles.singleButtonDesktop} href={`/edzesek/${data.edzes_id}/szerkeszt`} width={420} rightIcon="PlayRightIcon">
                    Edzés kezdése
                </Button>
            );
        }
    };

    const renderEdzesButtonMobile = () => {
        if (data.isFinalized) {
            return (
                <Button additionalClassName={styles.singleButtonMobile} onClick={cloneEdzesWithoutSets} rightIcon="PlayRightIcon">
                    Új Edzés Kezdése
                </Button>
            );
        } else if (!isDateToday) {
            return (
                <Button additionalClassName={styles.singleButtonMobile} disabled>
                    Edzés kezdése
                </Button>
            );
        } else if (isSameAsLocal) {
            return (
                <Button additionalClassName={styles.singleButtonMobile} href={`/edzesek/${data.edzes_id}/szerkeszt`} rightIcon="VisibilityOnIcon">
                    Edzés Folytatása
                </Button>
            );
        } else {
            return (
                <Button additionalClassName={styles.singleButtonMobile} href={`/edzesek/${data.edzes_id}/szerkeszt`} rightIcon="PlayRightIcon">
                    Edzés kezdése
                </Button>
            );
        }
    };



    return <>
        <ContentLayout header={data.edzes_neve} subheader={checkifEdzesIsCurrent()}>
            <div className={styles.edzesView}>


                <ConfirmationModal
                    visible={isDeleteEdzesConfirmModalOpen}
                    title="Biztos, hogy törölni akarja ezt az edzést?"
                    onConfirm={handleDeleteEdzesConfirm}
                    onCancel={DeleteEdzesConfirmModalCancel}
                    confirmText="Igen"
                    cancelText="Nem"
                />
                <div className={styles.buttons}>

                    <div className={styles.doubleButtonDesktop} >
                        {renderEdzesButtonDesktop()}
                        <div className="flex justify-between w-full ">

                            <Button width={200} color="primary" onClick={() => handleBack()}>Vissza</Button>
                            <Button
                                width={200}
                                color="secondary"
                                onClick={handleOpenDeleteConfirm}
                                rightIcon="TrashCanIcon"
                            >
                                Törlés
                            </Button>
                        </div>

                    </div>


                    <div className={styles.doubleButtonMobile} >
                        {renderEdzesButtonMobile()}


                        <Button
                            additionalClassName={styles.btnmobileresponsive}
                          
                            color="primary"
                            onClick={() => handleBack()}
                        >
                            Vissza
                        </Button>
                        <Button
                            additionalClassName={styles.btnmobileresponsive}
                            style={{ marginTop: '1rem' }}
                            onClick={handleOpenDeleteConfirm}
                            color="secondary"
                            rightIcon="TrashCanIcon"
                        >
                            Törlés
                        </Button>
                    </div>
                </div>

                <div className={styles.humanContainment}>
                    <BodySVG size={'85%'} className={styles["svg"]} selectedMuscleIds={edzesIzomcsoportok(data).foIzomcsoportok} secondaryMuscleIds={edzesIzomcsoportok(data).izomcsoportok}></BodySVG>

                </div>

                <div className={styles.underlinedText}>
                    <UnderLinedText lineLength={220} text="Gyakorlatok"></UnderLinedText>
                </div>
                {data.gyakorlatok.length == 0 && (
                    <>
                        <Text className={styles["no-gyak-text"]} variant="h5">
                            Az edzés jelenleg még nem tartalmaz gyakorlatokat
                        </Text>
                    </>
                )}
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

function isToday(date: Date): boolean {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}
