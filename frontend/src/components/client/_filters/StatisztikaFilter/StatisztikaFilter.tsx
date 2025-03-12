import { Form, Formik } from "formik";
import { FormikSelect } from "../../_inputs";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./StatisztikaFilter.module.scss";
import { Text } from "@/components/server";

interface StatFilterProps {
  onFilterChange: (values: any) => void;
}

const StatFilter: React.FC<StatFilterProps> = ({ onFilterChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const Option = [
    { label: "hét", value: "week" },
    { label: "hónap", value: "month" },
    { label: "félév", value: "halfyear" },
    { label: "összes", value: "all" },
  ];

  const initialIdotartam = searchParams.get("type") || "all";

  return (
    <Formik
      className={styles.formikInput}
      initialValues={{ idotartam: initialIdotartam }}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ setFieldValue, values }) => {
        useEffect(() => {
          if (values.idotartam) {
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set("type", values.idotartam);
            
          
            router.push(`?${queryParams.toString()}`, { scroll: false });

            onFilterChange(values.idotartam);
          }
        }, [values.idotartam]);

        return (
          <Form style={{ maxWidth: "320px", marginTop: "0.5rem" }}>
            <label>
              <Text variant="caption">Időtartam:</Text>
            </label>
            <FormikSelect name="idotartam" options={Option} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default StatFilter;
