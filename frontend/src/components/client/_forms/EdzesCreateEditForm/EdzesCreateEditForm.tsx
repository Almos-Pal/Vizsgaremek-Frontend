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

interface EdzesCreateEditFormProps {
  data: Edzes;
  // since we always have an edzés_id, no need for an "id" prop separately
}

const EdzesCreateEditForm = ({ data }: EdzesCreateEditFormProps) => {
  const [isGyakorlatModalOpen, setIsGyakorlatModalOpen] = useState(false);
  const { mutate: updateEdzes } = useEdzes.updateEdzes();
  const { mutate: addGyakorlatToEdzes } = useEdzes.addGyakorlatToEdzes();

  // Map the edzés to the form values shape
  const initialValues: EdzesFormValues = mapEdzesToFormValues(data);

  const handleSubmit = (values: EdzesFormValues) => {
    const submissionValues = {
      ...values,
      datum: new Date(),
      user_id: 5, // CURRENTLY STATIC, update with your authentication logic
      ido: values.ido,
    };

    updateEdzes(
      { id: submissionValues.edzes_id!, updatedEdzes: submissionValues },
      {
        onSuccess: () => {
          console.log("Edzés updated");
        },
      }
    );
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

          <Button type="submit" color="primary">
            Edzés Véglegesítése
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EdzesCreateEditForm;
