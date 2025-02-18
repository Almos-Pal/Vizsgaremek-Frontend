"use client";

import React from "react";
import { Text } from "@/components/server";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import useEdzes from "@/hooks/useEdzes";
import { Button } from "@/components/client";
import FormField from "../FormField/FormField";
import { Input } from "../../_inputs";
import style from "./NewEdzesForm.module.scss";
import * as Yup from "yup";



interface FormValues {
    edzes_neve: string;

}

interface NewEdzesFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}


const validationSchema = Yup.object().shape({
    edzes_neve: Yup.string().required("Az edzés nevének megadása kötelező").min(3, "Az edzés nevének legalább 3 karakter hosszúnak kell lennie"),
});

const NewEdzesForm: React.FC<NewEdzesFormProps> = ({ onSuccess, onCancel }) => {
    const router = useRouter();
    const { mutate: createEdzes } = useEdzes.createEdzes();

    const initialValues: FormValues = { edzes_neve: "" };

    const handleSubmit = (values: FormValues) => {
        const newEdzesPayload = {
            edzes_neve: values.edzes_neve,
            datum: new Date(),
            user_id: 1, //IMPORTANT MAJD A USER ID-T KELL BEÁLLÍTANI SESSIONBŐL
            ido: 0,
        };

        createEdzes(newEdzesPayload, {
            onSuccess: (newEdzes: any) => {
                
                router.push(`/edzes/${newEdzes.edzes_id}/szerkeszt`);
                onSuccess(); 
            },
            onError: (error: any) => {
                console.error("Error creating edzés:", error);
            }
        });
    };

    return (
        <div className={style.formContainer}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div style={{ marginBottom: "1.5rem"}}>
                            <Text style={{ marginBottom: '1.5rem' }} variant="h4">Adja meg az edzés nevét</Text>
                            <div style={{ marginBottom: "1.5rem", width: "90%", marginLeft: "auto" , marginRight: "auto"}}>
                                <FormField
                                    id="edzes_neve"
                                    name="edzes_neve"
                                    placeholder="Edzés neve"
                                    as={Input}
                                />
                            </div>
                            <div className="flex justify-center gap-5">
                                <Button type="submit" disabled={isSubmitting} color="primary">
                                    Létrehozás
                                </Button>
                                <Button width={145} type="button" onClick={onCancel} color="secondary">
                                    Mégse
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );

}

export default NewEdzesForm;