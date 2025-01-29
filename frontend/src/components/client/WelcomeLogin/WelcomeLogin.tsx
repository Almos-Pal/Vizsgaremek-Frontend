"use client";

import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import styles from './WelcomeLogin.module.scss'; // import the SCSS module

// Components
import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Text } from "@/components/server";

const initialValues = {
    email: '',
    password: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email megadása kötelező"),
    password: Yup.string().required("Jelszó megadása kötelező"),
});

const WelcomeLogin: React.FC = () => {

    const handleSubmit = (values: typeof initialValues) => {
        console.log(values.email, values.password);
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
                        href={'/regisztracio'}
                    >
                        Regisztráció
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default WelcomeLogin;