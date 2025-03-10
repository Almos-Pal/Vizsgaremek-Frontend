import { Form, Formik } from "formik";
import { FormikSelect } from "../../_inputs";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./StatisztikaFilter.module.scss";
import { Text } from "@/components/server";
interface StatFilterProps {
  onFilterChange: (values: any) => void;
}



const StatFilter: React.FC<StatFilterProps> = ({ onFilterChange }) => {
  const Option = [
    { label: "hét", value: "week" },
    { label: "hónap", value: "month" },
    { label: "félév", value: "halfyear" },
    { label: "összes", value: "all" },
  ]

  return (
    <Formik
      classname={styles.formikInput}
      initialValues={{ idotartam: "" }}
      onSubmit={() => { }}
    >
      {({ setFieldValue, values }) => {
        useEffect(() => {
          const queryParams = new URLSearchParams();
          if (values.idotartam) queryParams.set("type", values.idotartam);
          setFieldValue("idotartam", values.idotartam);
          onFilterChange(values.idotartam)


        }, [values.idotartam]);

        return (
          <>
            <Form style={{ maxWidth: "320px", marginTop: '0.5rem' }} >
            <label>
                    <Text variant="caption">Időtartam:</Text>
                  </label>
              <FormikSelect

                name="idotartam"
              
                options={Option}

              />
            </Form>




          </>
        );
      }}
    </Formik>
  );

}
export default StatFilter;