"use client";

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import styles from './WelcomeLogin.module.scss';

// Components
import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Text } from "@/components/server";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/components/navigation';

const initialValues = {
    email: '',
    password: ''
};


//way to get session data
//const session = getServerSession(authOptions);
//sessions are stored in cookies
// session contains user data, token, etc.
//place this in a fetch request's header to get user data
// authorization: `Bearer ${session.backendTokens.accessToken}`


//middleware:
// export { default } from 'next-auth/middleware';
// export const config = { matcher: ["/((?!bejelentkezes|regisztracio).*)"]};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Helytelen email formátum").required("Email megadása kötelező"),
    password: Yup.string().required("Jelszó megadása kötelező"),
});

const WelcomeLogin: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    console.log(session);
    const handleSubmit = async (values: typeof initialValues) => {
        // Example signIn call to trigger your CredentialsProvider authorize() function

        setErrorMessage("");
        const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            // If you want an immediate redirect upon success, set redirect to true.
            // If you want to handle the result manually, set redirect to false and check result.error/result.ok.
            redirect: false,
        });

        if (result?.error) {
            setErrorMessage("Hibás email vagy jelszó! Ellenőrizze a beírt adatokat.");
        } else {
            router.push("/test/akos");
        }

    };

    return (
        <div className={styles.container}>
            <Text className={styles.title} variant="h1">
                RepVault
            </Text>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form>
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
                        <Text variant='subtitle-15' color="var(--color-error)" style={{ textAlign: 'center', marginTop: '1rem', maxWidth: '100%' }}>{errorMessage} </Text>
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