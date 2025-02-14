"use client"


import React from 'react'
import { Formik, Form } from "formik";
import { FormikSelect } from "../../_inputs"; // Adjust import path as needed
import Button from "../../Button/Button";
import useGyakorlat from "@/hooks/useGyakorlat";
import { Gyakorlat } from '@/types';


interface AddGyakorlatModalProps {
    onAdd: (gyakorlat: Gyakorlat) => void;
    onCancel: () => void;
}

interface FormValues {
    gyakorlat: string | null;
}



const AddGyakorlatModal: React.FC<AddGyakorlatModalProps> = ({ onAdd, onCancel }) => {
    const initialValues: FormValues = { gyakorlat: null };

    const { data: gyakorlatok } = useGyakorlat.getGyakorlatok({ limit: 1000 });



    const gyakorlatOptions =
        gyakorlatok?.items?.map((gy: any) => ({
            value: gy.gyakorlat_id.toString(),
            label: gy.gyakorlat_neve,
        })) || [];

    const handleSubmit = (values: FormValues) => {
        // Find the full gyakorlat object based on the selected value
        const selectedGyakorlat = gyakorlatok?.items.find(
            (gy: any) => gy.gyakorlat_id.toString() === values.gyakorlat
        );

        if (selectedGyakorlat) {
            onAdd(selectedGyakorlat);
        }
    };
    console.log("pspdpasdpsadpsadpasda")

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <FormikSelect
                        name="gyakorlat"
                        placeholder="Válassz gyakorlatot"
                        label="Gyakorlat"
                        options={gyakorlatOptions}
                        isClearable
                      
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "flex-end",
                            marginTop: "1rem",
                        }}
                    >
                        <Button type="button" onClick={onCancel} color="secondary">
                            Mégse
                        </Button>
                        <Button type="submit" disabled={isSubmitting} color="primary">
                            Hozzáadás
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}


export default AddGyakorlatModal;