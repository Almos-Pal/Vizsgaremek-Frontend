"use client";

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import styles from './WelcomeLogin.module.scss';

import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Text } from "@/components/server";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/dist/client/components/navigation';

import { loginSchema } from '@/utils/Validations/loginSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { useToast } from '@/hooks';


const initialValues = {
    email: '',
    password: ''
};


//way to get session data
//sessions are stored in cookies
// session contains user data, token, etc.
//place this in a fetch request's header to get user data
// authorization: `Bearer ${session.backendTokens.accessToken}`





const WelcomeLogin: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const toast = useToast();
    //console.log(session);
    const handleSubmit = async (values: typeof initialValues) => {
        //console.log("Submitting credentials:", values);
        setErrorMessage("");
        const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/dashboard", //Here you can change where to immidiately redirect after login
        });
        //console.log("SignIn result:", result);
        
        
        if (result?.error) {
            //console.error("Login error:", result.error);
            toast.error('Hibás email vagy jelszó! Ellenőrizze a beírt adatokat.');
            setErrorMessage("Hibás email vagy jelszó! Ellenőrizze a beírt adatokat.");
        } else if (result?.ok) {
            toast.success('Sikeres bejelentkezés!');
            setTimeout(() => {
                router.push("/dashboard");
            }, 500);

        };

    };

    return (
        <div className={styles.container}>
            <Text className={styles.title} variant="h1">
                RepVault
            </Text>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={loginSchema}
            >
                <Form className={styles.form}>
                    <FormField
                        name="email"
                        as={Input}
                        type="text"
                        label="Email cím"
                        placeholder="Email cím"
                        isRequired={true}
                        style={{ marginTop: '5%' }}
                    />

                    <FormField
                        name="password"
                        as={Input}
                        type="password"
                        label="Jelszó"
                        placeholder="Jelszó"
                        isRequired={true}
                        style={{ marginTop: '1rem' }}
                    />

                    <div className='error-message'>
                        <Text variant='subtitle-15' color="var(--color-error)" style={{ textAlign: 'center', marginTop: '1rem', maxWidth: '275px' }}>{errorMessage} </Text>
                    </div>

                    <Button
                        width="100%"
                        style={{ marginTop: '1.5rem' }}
                        color="secondary"
                        type="submit"
                    >
                        Bejelentkezés
                    </Button>

                    <div className={styles.dividerContainer}>
                        <hr className={styles.divider} />
                        <Text variant="caption" className={styles.dividerText}>
                            vagy
                        </Text>
                        <hr className={styles.divider} />
                    </div>

                    <Button
                        width="100%"
                        style={{ marginTop: '1rem' }}
                        color="secondary"
                        type="button"
                        href={"/regisztracio"}
                    >
                        Regisztráció
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default WelcomeLogin;