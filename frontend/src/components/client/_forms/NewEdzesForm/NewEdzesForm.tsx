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
    onError?: (error: any) => void;
    onCancel: () => void;
}


const validationSchema = Yup.object().shape({
    edzes_neve: Yup.string().required("Az edzés nevének megadása kötelező").min(3, "Az edzés nevének legalább 3 karakter hosszúnak kell lennie"),
});

const NewEdzesForm: React.FC<NewEdzesFormProps> = ({ onSuccess, onCancel }) => {
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
            ido: 0,
        };

        try{

        
        createEdzes(newEdzesPayload, {
            onSuccess: (newEdzes: any) => {
                
                router.push(`/edzes/${newEdzes.edzes_id}/szerkeszt`);
                onSuccess(); 
                toast.success("Edzés sikeresen elkezdve");
            },
            onError: (error: any) => {
                if (error == "Error: 409") {
                    toast.error("A mai nap már van edzés");
                }
                else{
                    console.error("Error creating edzés:", error);
                    toast.error("Hiba történt az edzés létrehozása közben");
                }
            }
        });
    } catch (error) {}
    };

    return (
        <div className={style.formContainer}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div style={{ marginBottom: "1.5rem"}}>
                            <Text style={{ marginBottom: '1.5rem' }}  variant="h4">Adja meg az edzés nevét</Text>
                            <div style={{ marginBottom: "1.5rem", width: "100%", marginLeft: "auto" , marginRight: "auto"}}>
                                <FormField
                                    id="edzes_neve"
                                    name="edzes_neve"
                                    placeholder="Edzés neve"
                                    as={Input}
                                    
                                />
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button width={'50%'} type="submit" disabled={isSubmitting} color="primary">
                                    Létrehozás
                                </Button>
                                <Button width={'50%'} type="button" onClick={onCancel} color="secondary">
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