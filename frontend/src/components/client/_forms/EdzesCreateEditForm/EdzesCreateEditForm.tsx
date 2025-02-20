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
import { mapEdzesToFormValues } from "@/utils/mapEdzesToFormValues"; // adjust path if needed
import AddGyakorlatModal from "../AddGyakorlatModalForm/AddGyakorlatModalForm";
import ConfirmationModal from "../../_modal/ConfirmationModal/ConfirmationModal";
import { useRouter } from "next/navigation";

import styles from './EdzesCreateEditForm.module.scss'

interface EdzesCreateEditFormProps {
  data: Edzes;
}

const EdzesCreateEditForm = ({ data }: EdzesCreateEditFormProps) => {
  
  const [isConfirmFinalModalOpen, setIsConfirmFinalModalOpen] = useState(false);
  const [isGyakorlatModalOpen, setIsGyakorlatModalOpen] = useState(false);
  


  const router = useRouter();
  const { mutate: updateEdzes } = useEdzes.updateEdzes();
  const { mutate: addGyakorlatToEdzes } = useEdzes.addGyakorlatToEdzes();

  // Map the edzés to the form values shape
  const initialValues: EdzesFormValues = mapEdzesToFormValues(data);

  const handleSubmit = (values: EdzesFormValues) => {
    const submissionValues = {
      ...values,
      datum: new Date(),
      user_id: 1, // CURRENTLY STATIC, update with your authentication logic
      ido: values.ido,
    };
    console.log('edzes submited for some reason')

    updateEdzes(
      { id: submissionValues.edzes_id!, updatedEdzes: submissionValues },
      {
        onSuccess: () => {
          console.log("Edzés updated");
          router.push("/edzes");
        },
      }
    );
  };

  return (

    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
      {({ values, submitForm }) => (
        <Form>
          <div className={styles['container']}>
            <FormField
              name="edzes_neve"
              label="Edzés neve"
              placeholder="Edzés neve"
              as={Input}
            />
            <div style={{ marginTop: '2rem' }}>
              <UnderLinedText text="Gyakorlatok" lineLength={220} />
            </div>
          </div>

          <FieldArray name="gyakorlatok">
            {(arrayHelpers) => (
              <>
                {values.gyakorlatok.map((gyakorlat, index) => (
                  <GyakorlatokFieldArray
                    key={index}
                    index={index}
                    gyakorlat={gyakorlat}
                    arrayHelpers={arrayHelpers}
                    prevHistory={gyakorlat.previous_history || []}
                  />
                ))}

                <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                  <Button
                    type="button"
                    onClick={() => setIsGyakorlatModalOpen(true)}
                    color="secondary"
                    additionalClassName={styles['gyakorlatPlusButton']}
                  >
                    Gyakorlat Hozzáadása
                  </Button>
                </div>

                {isGyakorlatModalOpen && (
                  <Modal
                    visible={isGyakorlatModalOpen}
                    onClose={() => setIsGyakorlatModalOpen(false)}
                    title="Gyakorlat kiválasztása"
                    width={350}
                    height={475 }
                    showCloseButton={false}

                    
                  >
                    <AddGyakorlatModal
                      existingGyakorlatIds={values.gyakorlatok.map((g) => g.gyakorlat_id || 0)}
                      onAdd={(selectedGyakorlat) => {
                        addGyakorlatToEdzes(
                          {
                            edzesId: values.edzes_id!,
                            userId: 1, // CURRENTLY STATIC, update as needed
                            gyakorlatId: selectedGyakorlat.gyakorlat_id,
                          },
                          {
                            onSuccess: (returnedGyakorlat) => {
                              arrayHelpers.push({
                                gyakorlat_id: returnedGyakorlat.gyakorlat_id || 0,
                                gyakorlat_neve: returnedGyakorlat.gyakorlat_neve || "",
                                szettek: returnedGyakorlat.szettek || [],
                              });
                              setIsGyakorlatModalOpen(false);
                            },
                            onError: (error) => {
                              console.error("Error adding gyakorlat to edzés", error);
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


          <div className={styles['submit-button-div']}>
            <Button
              type="button"
              onClick={() => setIsConfirmFinalModalOpen(true)}
              color="primary"
            >
              Edzés Véglegesítése
            </Button>

            {isConfirmFinalModalOpen && (
              <ConfirmationModal
                visible={isConfirmFinalModalOpen}
                title="Biztosan véglegesíteni szeretnéd az edzést?"
                onConfirm={() => {
                  setIsConfirmFinalModalOpen(false);
                  submitForm();
                }}
                onCancel={() => setIsConfirmFinalModalOpen(false)}
                confirmText="Igen"
                cancelText="Nem"
              />
            )}
          </div>
        </Form>
      )}
    </Formik>

  );
};

export default EdzesCreateEditForm;
