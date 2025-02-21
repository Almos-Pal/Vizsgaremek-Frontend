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
import styles from "./EdzesCreateEditForm.module.scss";

interface EdzesCreateEditFormProps {
  data: Edzes;
}

const validationSchema = Yup.object().shape({
  edzes_neve: Yup.string()
    .required("Az edzés nevének megadása kötelező")
    .min(3, "Az edzés nevének legalább 3 karakter hosszúnak kell lennie"),
  gyakorlatok: Yup.array().of(
    Yup.object().shape({
      gyakorlat_id: Yup.number().required("A gyakorlat kiválasztása kötelező"),
      gyakorlat_neve: Yup.string().required("A gyakorlat nevének megadása kötelező"),
      szettek: Yup.array().of(
        Yup.object().shape({
          reps: Yup.number()
            .transform((value, originalValue) =>
              String(originalValue).trim() === "" ? undefined : value
            )
            .required("Az ismétlések számának megadása kötelező")
            .min(1, "Az ismétlések számának legalább 1-nek kell lennie"),
          weight: Yup.number()
            .transform((value, originalValue) =>
              String(originalValue).trim() === "" ? undefined : value
            )
            .required("A súly megadása kötelező")
            .min(1, "A súlynak legalább 1-nak kell lennie"),
        })
      ),
    })
  ),
});

const EdzesCreateEditForm = ({ data }: EdzesCreateEditFormProps) => {
  const [isConfirmFinalModalOpen, setIsConfirmFinalModalOpen] = useState(false);
  const [isGyakorlatModalOpen, setIsGyakorlatModalOpen] = useState(false);

  const router = useRouter();
  const { mutate: updateEdzes } = useEdzes.updateEdzes();
  const { mutate: addGyakorlatToEdzes } = useEdzes.addGyakorlatToEdzes();
  const { mutate: changeFinalizedStatus } = useEdzes.changeEdzesFinalizedStatus();

  const initialValues: EdzesFormValues = mapEdzesToFormValues(data);

  const handleSubmit = (values: EdzesFormValues) => {
    const storedStartTime = localStorage.getItem("edzesStartTime");
    const startTime = storedStartTime ? parseInt(storedStartTime, 10) : Date.now();
    const elapsedTime = Date.now() - startTime;
    localStorage.removeItem("edzesStartTime");

    const submissionValues = {
      ...values,
      datum: new Date(),
      user_id: 1, // HARD CODED - REPLACE WITH ACTUAL USER ID
      ido: elapsedTime / 60000, // elapsed time in minutes
    };

    console.log("Edzés submitted with elapsed time:", elapsedTime);

    updateEdzes(
      { id: submissionValues.edzes_id!, updatedEdzes: submissionValues },
      {
        onSuccess: () => {
          console.log("Edzés updated");
          router.push(`/edzes/${data.edzes_id}`);
        },
      }
    );

    changeFinalizedStatus(
      { edzesId: submissionValues.edzes_id!, userId: 1, finalized: true },
      {
        onSuccess: () => {
          console.log("Edzés finalized");
        },
      }
    );
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, submitForm }) => (
        <Form>
          <div className={styles["container"]}>
            <FormField
              name="edzes_neve"
              label="Edzés neve"
              placeholder="Edzés neve"
              as={Input}
              isRequired
            />
            <div style={{ marginTop: "2rem" }}>
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
                    width={250}
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
                            userId: 1, // update as needed
                            gyakorlatId: selectedGyakorlat.gyakorlat_id,
                          },
                          {
                            onSuccess: (returnedGyakorlat) => {
                              arrayHelpers.push({
                                gyakorlat_id: returnedGyakorlat.gyakorlat_id || 0,
                                gyakorlat_neve:
                                  returnedGyakorlat.gyakorlat_neve || "",
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
          <div className={styles["submit-button-div"]}>
            <Button
              type="button"
              onClick={() => setIsConfirmFinalModalOpen(true)}
              color="primary"
              width={250}
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
