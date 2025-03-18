"use client";


import React from 'react';
import styles from './Register.module.scss';
import { Text } from "@/components/server";
import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/dist/client/components/navigation';

import { registerSchema } from '@/utils/Validations/registerSchema';
import { toast } from 'react-toastify';
import Link from 'next/link';

const initialValues = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
};

const Register: React.FC = () => {

    const router = useRouter();

    const handleSubmit = async (values: typeof initialValues) => {
        const res = (await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: values.email,
                username: values.username,
                password: values.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }));
        if (res.status === 400) {
            toast.error('Az email cím már foglalt!');
            return;
        }
        if (!res.ok) {
            toast.error('Hiba a regisztráció során!');
            return;
        }
        else {

            const response = await res.json();
            console.log('Sikeres regisztráció');
            toast.success('Sikeres regisztráció!');
            //console.log({ response })
            router.push('/bejelentkezes')
        }


    };


    return (
        <div className={styles.container}>
            <Text className={styles.title} variant="h1">
                Regisztráció
            </Text>

            <div style={{ maxWidth: '275px' }}>
                <Formik

                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        console.log("Formik onSubmit triggered!");  // Debugging log
                        handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    validationSchema={registerSchema}
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
                            name='username'
                            as={Input}
                            type='text'
                            label='Felhasználónév'
                            placeholder='Felhasználónév'
                            isRequired={true}
                            style={{ marginTop: '1rem' }}
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

                        <FormField
                            name="passwordConfirm"
                            as={Input}
                            type="password"
                            label="Jelszó megerősítése"
                            placeholder="Jelszó megerősítése"
                            isRequired={true}
                            style={{ marginTop: '1rem' }}
                        />

                        <Button
                            width="80%"
                            style={{ marginTop: '1.5rem' }}
                            color="secondary"
                            type="submit"
                        >
                            Regisztrálás
                        </Button>
                        <Link
                            href={'/bejelentkezes'} className={styles["show-more-button"]}>
                            Vissza a bejelentkezéshez

                        </Link>

                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;