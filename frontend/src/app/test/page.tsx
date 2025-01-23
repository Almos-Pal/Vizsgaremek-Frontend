"use client";
import { Button } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Text } from "@/components/server";
import { Form, Formik } from "formik";
import { Navbar } from "@/components/client";

import * as Yup from "yup";

const TestPage: React.FC = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
  });
  return (
    <div>
      <Navbar />
      <Text variant="h1">Test Page</Text>
      <Text variant="h2">Test Page</Text>
      <Text variant="h3">Test Page</Text>
      <Text variant="h4">Test Page</Text>
      <Text variant="h5">Test Page</Text>
      <Text variant="subtitle-15">Test Page</Text>
      <Text variant="body-15">Test Page</Text>
      <Text variant="subtitle-16">Test Page</Text>
      <Text variant="body-16">Test Page</Text>
      <Text variant="button">Test Page</Text>
      <Text variant="caption">Test Page</Text>
      <div className="flex flex-row gap-2 ">
        <Button>Test Button</Button>
        <Button leftIcon="ArrowLeftIcon">Test Button</Button>
        <Button iconOnly leftIcon="ArrowLeftIcon" />
        <Button color="secondary">Test Button</Button>
        <Button color="secondary" leftIcon="ArrowLeftIcon">
          Test Button
        </Button>
        <Button color="secondary" iconOnly leftIcon="ArrowLeftIcon" />
      </div>

      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <div className="w-48">
            <FormField
              name="name"
              as={Input}
              type="password"
              label={"Hello"}
              placeholder={"Write here..."}
            />
          </div>
          <Button color="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
export default TestPage;
