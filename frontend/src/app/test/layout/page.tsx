"use client";
import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Text } from "@/components/server";
import { Form, Formik } from "formik";
import styles from "./test.module.scss";

import * as Yup from "yup";

const TestPage: React.FC = () => {

  return (
    <div className={styles['page-container']}>
        <div className={styles.sidebar}>
        </div>

        <div className={styles['layout-container']}>
            <div className={styles['daily-layout']}>...</div>
            <div className={styles['weekly-layout']}>...</div>
            <div className={styles['calendar-layout']}>...</div>
            <div className={styles['pr-layout']}>...</div>
            <div className={styles['statistics-layout']}>...</div>
        </div>
    </div>
  );
};
export default TestPage;
