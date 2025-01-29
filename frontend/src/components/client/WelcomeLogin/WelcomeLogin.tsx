"use client"

import React from 'react';
import styles from './WelcomeLogin.module.scss';
import { Form, Formik } from 'formik';
import FormField from '../_forms/FormField/FormField';
import Button from '../Button/Button';
import Input from '../_inputs/Input/Input';
import Text from '../../server/Text/Text'
import FunnyIcon from '@/components/server/Icons/FunnyIcon';

import * as Yup from "yup";

const initialValues = {
    email: '',
    password: ''
}




const WelcomeLogin: React.FC = () => {

    const handleSubmit = (values: typeof initialValues) => {
        console.log(values.email, values.password);
    };


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
    });



    return (
        <div className={styles.container}>
            <Text variant='h1'>RepVault</Text>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}>

                <Form>

                    <FormField
                        name="email"
                        as={Input}
                        type="text"
                        label={"Email cím"}
                        placeholder={"Email cím"}
                        isRequired={true}

                    />

                    <FormField
                        name="password"
                        as={Input}
                        type="password"
                        label={"Jelszó"}
                        placeholder={"Jelszó"}
                        isRequired={true}
                    />

                    <Button width={'100%'} style={{marginTop: '1rem'}} color="secondary" type="submit">
                        Bejelentkezés
                    </Button>


                    <Button width={'100%'}  style={{marginTop: '1rem'}} color='secondary' type='button'>
                        Regisztráció
                    </Button>

                </Form>

            </Formik>




        </div>
    );
};

export default WelcomeLogin;