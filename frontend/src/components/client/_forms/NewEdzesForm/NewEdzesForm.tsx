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
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks";



interface FormValues {
    edzes_neve: string;

}

interface NewEdzesFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    template?: boolean;
}



const NewEdzesForm: React.FC<NewEdzesFormProps> = ({ onSuccess, onCancel, template }) => {
    const validationSchema = Yup.object().shape({
        edzes_neve: Yup.string()
            .required(template ? "Az edzésterv nevének megadása kötelező" : "Az edzés nevének megadása kötelező")
            .min(3, template ? "Az edzésterv nevének legalább 3 karakter hosszúnak kell lennie" : "Az edzés nevének legalább 3 karakter hosszúnak kell lennie"),
    });
    const router = useRouter();
    const toast = useToast();
    const { mutate: createEdzes } = useEdzes.createEdzes();

    const { data: session } = useSession();
    const initialValues: FormValues = { edzes_neve: "" };

    const handleSubmit = (values: FormValues) => {
        const newEdzesPayload = {
            edzes_neve: values.edzes_neve,
            datum: new Date(),
            user_id: session?.user.user_id!, //dont touch
            isTemplate: template ? 1 : 0,
        };

        createEdzes(newEdzesPayload, {
            onSuccess: (newEdzes: any) => {

                const redirectUrl = template ? `/edzestervek/${newEdzes.edzes_id}` : `/edzes/${newEdzes.edzes_id}/szerkeszt`;
                router.push(redirectUrl);
                onSuccess();

                toast.success(template ? "Edzésterv sikeresen létrehozva" : "Edzés sikeresen elkezdve");
            },
            onError: (error: any) => {
                console.error("Error creating edzés:", error);
                toast.error(template ? "Hiba történt az edzésterv létrehozása közben" :"Hiba történt az edzés létrehozása közben");
            }
        });
    };

    return (
        <div className={style.formContainer}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <Text style={{ marginBottom: '1.5rem' }} variant="h4">Adja meg az  {template ? " edzésterv" : " edzés"} nevét</Text>
                            <div style={{ marginBottom: "1.5rem", width: "100%", marginLeft: "auto", marginRight: "auto", maxWidth: "390px"}}>
                                <FormField
                                    id="edzes_neve"
                                    name="edzes_neve"
                                    placeholder={template ? " Edzésterv neve" : " Edzés neve"}
                                    as={Input}
                                    

                                />
                            </div>
                            <div className={style["button-container"]}>
                                
                                <Button additionalClassName={style["nope-button"]} type="button" onClick={onCancel} color="primary">
                                    Mégse
                                </Button>

                                <Button additionalClassName={style["yes-button"]} type="submit" disabled={isSubmitting} color="secondary">
                                    Létrehozás
                                </Button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </div >
    );

}

export default NewEdzesForm;