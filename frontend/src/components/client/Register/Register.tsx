import React from 'react';
import styles from './Register.module.scss';
import { Text } from "@/components/server";
import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email megadása kötelező"),
    username: Yup.string().required("Felhasználónév megadása kötelező"),
    password: Yup.string().required("Jelszó megadása kötelező"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), undefined], 'A jelszavaknak egyezniük kell')
});



const Register: React.FC = () => {



    const handleSubmit = (values: typeof initialValues) => {
        console.log(values.email, values.password);
    };


    return (
        <div className={styles.container}>
            <Text className={styles.title} variant="h1">
                Regisztráció
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
                        width="100%"
                        style={{ marginTop: '1.5rem' }}
                        color="secondary"
                        type="submit"
                        href={'/bejelentkezes'}
                    >
                        Regisztrálás
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;