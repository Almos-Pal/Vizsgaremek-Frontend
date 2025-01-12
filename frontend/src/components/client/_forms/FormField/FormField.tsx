"use client";

import { Field, useFormikContext } from "formik";
import React from "react";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  name: string;
  as: React.ComponentType<any>;
  isRequired?: boolean;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  as: Component,
  isRequired,
  ...props
}) => {
  const { errors, touched } = useFormikContext<any>();
  const id = `field-${name}`;
  const isError = touched[name] && errors[name];

  return (
    <div className={styles.formField}>
      <Field
        id={id}
        name={name}
        as={Component}
        isRequired={isRequired}
        {...props}
        className={isError ? styles.inputError : ""}
      />
      {isError && <div className={styles.error}>{String(errors[name])}</div>}
    </div>
  );
};

export default FormField;
