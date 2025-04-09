"use client";

import React from "react";
import styles from "./Register.module.scss";
import { Text } from "@/components/server";
import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/components/navigation";
import { useToast } from "@/hooks";
import { registerSchema } from "@/utils/Validations/registerSchema";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "@/utils";

const initialValues = {
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
};

const Register: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 409) {
      toast.error("Az email cím már használatban van");
      return;
    }

    if (res.status === 400 || !res.ok) {
      toast.error("Hiba a regisztráció során!");
      return;
    }

    console.log("Sikeres regisztráció");
    toast.success("Sikeres regisztráció!");
    router.push("/bejelentkezes");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={"/repvaultLogo.svg"}
          alt="Repvault Logo"
          width={50}
          height={50}
        />
        <Text className={styles["repvault"]} variant="h3">
          Repvault
        </Text>
      </div>
      <Text className={styles.title} variant="h1">
        Regisztráció
      </Text>

      <div style={{ maxWidth: "275px" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log("Formik onSubmit triggered!"); // Debugging log
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
              style={{ marginTop: "5%" }}
            />

            <FormField
              name="username"
              as={Input}
              type="text"
              label="Felhasználónév"
              placeholder="Felhasználónév"
              isRequired={true}
              style={{ marginTop: "1rem" }}
            />

            <FormField
              name="password"
              as={Input}
              type="password"
              label="Jelszó"
              placeholder="Jelszó"
              isRequired={true}
              style={{ marginTop: "1rem" }}
            />

            <FormField
              name="passwordConfirm"
              as={Input}
              type="password"
              label="Jelszó megerősítése"
              placeholder="Jelszó megerősítése"
              isRequired={true}
              style={{ marginTop: "1rem" }}
            />

            <Button
              width="80%"
              style={{ marginTop: "1.5rem" }}
              color="secondary"
              type="submit"
            >
              Regisztrálás
            </Button>
            <Link
              href={"/bejelentkezes"}
              className={styles["show-more-button"]}
            >
              Vissza a bejelentkezéshez
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
