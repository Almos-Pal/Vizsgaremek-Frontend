"use client";

import React from "react";
import { Formik, Form } from "formik";
import { FormikSelect } from "../../_inputs"; 
import Button from "../../Button/Button";
import useGyakorlat from "@/hooks/useGyakorlat";
import { Gyakorlat } from '@/types';

interface AddGyakorlatModalProps {
  onAdd: (gyakorlat: Gyakorlat) => void;
  onCancel: () => void;
  existingGyakorlatIds?: number[];
}

interface FormValues {
  gyakorlat: string; 
}

const AddGyakorlatModal: React.FC<AddGyakorlatModalProps> = ({ onAdd, onCancel, existingGyakorlatIds = [] }) => {
  const initialValues: FormValues = { gyakorlat: "" };

  const { data: gyakorlatok } = useGyakorlat.getGyakorlatok({ limit: 1000 });

  const gyakorlatOptions = gyakorlatok?.items?.map((gy: any) => ({
    value: gy.gyakorlat_id.toString(),
    label: gy.gyakorlat_neve,
  })) || [];

  const filteredOptions = gyakorlatOptions.filter((option) => {
    const id = parseInt(option.value, 10);
    return !existingGyakorlatIds.includes(id);
  });

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    const selectedGyakorlat = gyakorlatok?.items.find(
      (gy: any) => gy.gyakorlat_id.toString() === values.gyakorlat
    );
    if (selectedGyakorlat) {
      onAdd(selectedGyakorlat);
    }
    setSubmitting(false);
  };  

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form style={{marginTop: '1rem'}}>
          <div >
            <FormikSelect
              name="gyakorlat"
              placeholder="Válassz gyakorlatot"
              options={filteredOptions}
              isClearable
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: '1rem',
              justifyContent: "center",
              marginTop: "1rem",
              
            }}
          >
            <Button width={'45%'} type="button" onClick={onCancel} color="primary">
              Mégse
            </Button>
            <Button  type="submit" disabled={isSubmitting} color="secondary">
              Hozzáadás
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddGyakorlatModal;
