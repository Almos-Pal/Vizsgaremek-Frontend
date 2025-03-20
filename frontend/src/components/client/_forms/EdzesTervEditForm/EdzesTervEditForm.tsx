"use client";

import { Form, Formik, FieldArray } from "formik";
import React, { useState } from "react";
import Button from "../../Button/Button";
import GyakorlatokFieldArray from "../GyakorlatokFieldArray/GyakorlatokFieldArray";
import FormField from "../FormField/FormField";
import UnderLinedText from "../../UnderLinedText/UnderLinedText";
import { EdzesFormValues, Edzes } from "@/types/edzes";
import { Input } from "../../_inputs";
import useEdzes from "@/hooks/useEdzes";
import { Modal } from "../../_modal";
import { mapEdzesToFormValues } from "@/utils/mapEdzesToFormValues";
import AddGyakorlatModal from "../AddGyakorlatModalForm/AddGyakorlatModalForm";
import ConfirmationModal from "../../_modal/ConfirmationModal/ConfirmationModal";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import styles from "./EdzesTervEditForm.module.scss"
import { edzesSchema } from "@/utils/Validations/edzesSchema";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks";
import SmallGyakorlatView from "../../SmallGyakorlatView/SmallGyakorlatView";
import { BodySVG, Text } from "@/components/server";

interface EdzesCreateEditFormProps {
    data: Edzes;
}

const EdzesTervEditForm = ({ data }: EdzesCreateEditFormProps) => {
    const [isConfirmFinalModalOpen, setIsConfirmFinalModalOpen] = useState(false);
    const [isGyakorlatModalOpen, setIsGyakorlatModalOpen] = useState(false);

    const toast = useToast();
    const { data: session } = useSession();

    const router = useRouter();
    const { mutate: updateEdzes } = useEdzes.updateEdzes();
    const { mutate: addGyakorlatToEdzes } = useEdzes.addGyakorlatToEdzes();

    const initialValues: EdzesFormValues = mapEdzesToFormValues(data);



    const { mutateAsync: deleteEdzesAsync } = useEdzes.deleteEdzes();

    const handleDeleteEdzesConfirm = async () => {
        setIsDeleteEdzesConfirmModalOpen(false);
        try {
            await deleteEdzesAsync(data.edzes_id, {
                onSuccess: () => {
                    console.log("Edzésterv törölve");
                    toast.success("Edzésterv törölve");
                },
                onError: (error) => {
                    console.error("Error deleting edzésterv:", error);
                    toast.error("Hiba történt az edzésterv törlésekor");
                }
            });

            router.push("/edzestervek");
        } catch (error) {
            console.error("Error deleting edzésterv:", error);
            toast.error("Hiba történt az edzésterv törlésekor");
        }
    };

    const handleSubmit = (values: EdzesFormValues) => {

        const submissionValues = {
            ...values,
            user_id: session?.user.user_id,
        };


        updateEdzes(
            { id: submissionValues.edzes_id!, updatedEdzes: submissionValues },
            {
                onSuccess: () => {
                    console.log("Edzés updated");
                    toast.success("Edzésterv Elmentve");
                    router.push(`/edzestervek`);
                },
                onError: (error) => {
                    console.error("Error updating edzés", error);
                    toast.error("Hiba az edzésterv frissítésekor");
                },

            }
        );
    };


    const handleOpenDeleteConfirm = () => {
        setIsDeleteEdzesConfirmModalOpen(true);
    }

    const DeleteEdzesConfirmModalCancel = () => {
        setIsDeleteEdzesConfirmModalOpen(false);
    }

    const [isDeleteEdzesConfirmModalOpen, setIsDeleteEdzesConfirmModalOpen] = useState(false);


    const edzesIzomcsoportok = (data: Edzes) => {
        const foIzomcsoportok = new Set<number>();
        const izomcsoportok = new Set<number>();

        data.gyakorlatok.forEach(gyakorlat => {
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

    return (
        <Formik
            validationSchema={edzesSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, submitForm, validateForm }) => (
                <Form>
                    <div className={styles["container"]}>
                        <FormField
                            name="edzes_neve"
                            label="Edzés neve"
                            placeholder="Edzés neve"
                            as={Input}
                            isRequired
                        />
                        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                            <UnderLinedText text="Érintett izomcsoportok" lineLength={220} />
                        </div>
                        <div className={styles.humanContainment}>
                            <BodySVG size={'85%'} className={styles["svg"]} selectedMuscleIds={edzesIzomcsoportok(data).foIzomcsoportok} secondaryMuscleIds={edzesIzomcsoportok(data).izomcsoportok}></BodySVG>

                        </div>

                        <div style={{ marginTop: "2rem" }}>
                            <UnderLinedText text="Gyakorlatok" lineLength={220} />
                        </div>
                    </div>
                    <FieldArray name="gyakorlatok">
                        {(arrayHelpers) => (
                            <>
                                {values.gyakorlatok.length == 0 && (
                                    <>
                                        <Text  className={styles["no-gyak-text"]} variant="h5">
                                            Az edzésterv jelenleg még nem tartalmaz gyakorlatokat
                                        </Text>
                                    </>
                                )}
                                {values.gyakorlatok.map((gyakorlat, index) => (
                                    <SmallGyakorlatView
                                        key={index}
                                        index={index}
                                        gyakorlat={{
                                            ...gyakorlat,
                                            gyakorlat_id: gyakorlat.gyakorlat_id || 0,
                                            gyakorlat_leiras: gyakorlat.gyakorlat_leiras || '',
                                            fo_izomcsoport: gyakorlat.fo_izomcsoport || 0,
                                            izomcsoportok: gyakorlat.izomcsoportok || []
                                        }}
                                        arrayHelpers={arrayHelpers}
                                    />
                                ))}

                                <div
                                    style={{
                                        display: "flex",
                                        marginBottom: "1rem",
                                        justifyContent: "center",
                                        marginTop: "2rem",
                                    }}
                                >
                                    <Button
                                        type="button"
                                        onClick={() => setIsGyakorlatModalOpen(true)}
                                        color="secondary"
                                        additionalClassName={styles["gyakorlatPlusButton"]}

                                        rightIcon="AddIcon"
                                    >
                                        Gyakorlat
                                    </Button>
                                </div>
                                {isGyakorlatModalOpen && (
                                    <Modal
                                        visible={isGyakorlatModalOpen}
                                        onClose={() => setIsGyakorlatModalOpen(false)}
                                        title="Gyakorlat kiválasztása"
                                        width={350}
                                        height={475}
                                        showCloseButton={false}
                                    >
                                        <AddGyakorlatModal
                                            existingGyakorlatIds={values.gyakorlatok.map(
                                                (g) => g.gyakorlat_id || 0
                                            )}
                                            onAdd={(selectedGyakorlat) => {
                                                addGyakorlatToEdzes(
                                                    {
                                                        edzesId: values.edzes_id!,
                                                        userId: session?.user.user_id!, // this code is a work of art. don't ever dare to touch it
                                                        gyakorlatId: selectedGyakorlat.gyakorlat_id,
                                                    },
                                                    {
                                                        onSuccess: (returnedGyakorlat) => {
                                                            arrayHelpers.push({
                                                                gyakorlat_id: returnedGyakorlat.gyakorlat_id,
                                                                gyakorlat_neve: returnedGyakorlat.gyakorlat_neve,
                                                                gyakorlat_leiras: returnedGyakorlat.gyakorlat_leiras,
                                                                fo_izomcsoport: returnedGyakorlat.fo_izomcsoport,
                                                                izomcsoportok: returnedGyakorlat.izomcsoportok,
                                                            });
                                                            setIsGyakorlatModalOpen(false);

                                                            toast.success("Gyakorlat hozzáadva");
                                                        },
                                                        onError: (error) => {
                                                            console.error("Error adding gyakorlat to edzés", error);
                                                            toast.error("Hiba a gyakorlat hozzáadásakor");
                                                        },
                                                    }
                                                );
                                            }}
                                            onCancel={() => setIsGyakorlatModalOpen(false)}
                                        />
                                    </Modal>
                                )}
                            </>
                        )}
                    </FieldArray>
                    <div className={styles["submit-button-div"]}>

                        <Button
                            additionalClassName={styles.btnmobileresponsive}
                            onClick={handleOpenDeleteConfirm}
                            color="secondary" rightIcon="TrashCanIcon"
                            width={250}
                        >

                            terv Törlése
                        </Button>


                        <Button
                            type="button"
                            onClick={async () => {
                                const errors = await validateForm();
                                if (Object.keys(errors).length > 0) {
                                    toast.error("Hiba: Ellenőrizd az űrlap mezőit");
                                    return;
                                }
                                setIsConfirmFinalModalOpen(true);
                            }}
                            color="primary"
                            width={250}

                        >
                            Edzésterv Mentése
                        </Button>



                        {isConfirmFinalModalOpen && (
                            <ConfirmationModal
                                visible={isConfirmFinalModalOpen}
                                title="Biztosan menteni szeretnéd az edzéstervet?"
                                onConfirm={() => {
                                    setIsConfirmFinalModalOpen(false);
                                    submitForm();
                                }}
                                onCancel={() => setIsConfirmFinalModalOpen(false)}
                                confirmText="Igen"
                                cancelText="Nem"
                            />
                        )}

                        <ConfirmationModal
                            visible={isDeleteEdzesConfirmModalOpen}
                            title="Biztos, hogy törölni akarja az edzéstervet?"
                            onConfirm={handleDeleteEdzesConfirm}
                            onCancel={DeleteEdzesConfirmModalCancel}
                            confirmText="Igen"
                            cancelText="Nem"
                        />

                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EdzesTervEditForm;
