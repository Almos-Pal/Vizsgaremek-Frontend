"use client";

import { Form, Formik, FieldArray } from "formik";
import React, { useState } from "react";
import Button from "../../Button/Button";
import GyakorlatokFieldArray from "../GyakorlatokFieldArray/GyakorlatokFieldArray";
import FormField from "../FormField/FormField";
import UnderLinedText from "../../UnderLinedText/UnderLinedText";
import { EdzesFormValues } from "@/types/edzes";
import { Input } from "../../_inputs";
import useEdzes from "@/hooks/useEdzes";
import { AddGyakorlatModal, Modal } from "../../_modal";
// Adjust path as needed

interface EdzesCreateEditFormProps {
    initialData: EdzesFormValues;
    id?: number;
}

const EdzesCreateEditForm = ({ initialData, id }: EdzesCreateEditFormProps) => {
    const [isGyakorlatModalOpen, setIsGyakorlatModalOpen] = useState(false);
    const { mutate: createEdzes } = useEdzes.createEdzes();
    const { mutate: updateEdzes } = useEdzes.updateEdzes();
    const { mutate: addGyakorlatToEdzes } = useEdzes.addGyakorlatToEdzes();

    const initialValues: EdzesFormValues = {
        edzes_neve: initialData.edzes_neve || "",
        gyakorlatok: initialData.gyakorlatok || [],
        // ...other fields if needed
    };

    const handleSubmit = (values: EdzesFormValues) => {
        const submissionValues = {
            ...values,
            datum: new Date(),
            user_id: 5, //CURRENTLY STATIC CHANGE IN THE FUTURE WHEN MERGED WITH THE AUTHENTICATION BRANCHES
            ido: 0,
        };

        if (id) {
            updateEdzes(
                { id, updatedEdzes: submissionValues },
                {
                    onSuccess: () => {
                        console.log("Edzés updated");
                    },
                }
            );
        } else {
            createEdzes(submissionValues, {
                onSuccess: () => {
                    console.log("Edzés created");
                },
            });
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
            {({ values }) => (
                <Form>
                    <FormField
                        name="edzes_neve"
                        label="Edzés neve"
                        placeholder="Edzés neve"
                        as={Input}
                    />

                    <UnderLinedText text="Gyakorlatok" lineLength={220} />

                    <FieldArray name="gyakorlatok">
                        {(arrayHelpers) => (
                            <>
                                {values.gyakorlatok.map((gyakorlat, index) => (
                                    <GyakorlatokFieldArray
                                        key={index}
                                        index={index}
                                        gyakorlat={gyakorlat}
                                        arrayHelpers={arrayHelpers}
                                    />
                                ))}
                                <Button
                                    type="button"
                                    onClick={() => setIsGyakorlatModalOpen(true)}
                                    color="secondary"
                                >
                                    Gyakorlat Hozzáadása
                                </Button>

                                {isGyakorlatModalOpen && (
                                     <Modal
                                     visible={isGyakorlatModalOpen}
                                     onClose={() => setIsGyakorlatModalOpen(false)}
                                     title="Gyakorlat kiválasztása"
                                     width={400}
                                     height={400}
                                   >
                                     <AddGyakorlatModal
                                       onAdd={(selectedGyakorlat) => {
                                         // Call the API to add this gyakorlat to the existing edzés.
                                         // Make sure that values.edzes_id exists (this should be set when the edzés was created).
                                         addGyakorlatToEdzes(
                                           {
                                             edzesId: values.edzes_id, // edzés ID from your form values
                                             userId: 5, // Adjust the current user ID as needed
                                             gyakorlatId: selectedGyakorlat.gyakorlat_id,
                                           },
                                           {
                                             onSuccess: (returnedGyakorlat) => {
                                               // Update the form state with the returned gyakorlat (which now has a proper ID)
                                               arrayHelpers.push({
                                                 gyakorlat_neve: returnedGyakorlat.gyakorlat_neve,
                                                 gyakorlat_id: returnedGyakorlat.gyakorlat_id,
                                                 szettek: [],
                                               });
                                               setIsGyakorlatModalOpen(false);
                                             },
                                             onError: (error) => {
                                               console.error("Error adding gyakorlat to edzes", error);
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

                    <Button type="submit" color="primary">
                        Edzés Véglegesítése
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EdzesCreateEditForm;
