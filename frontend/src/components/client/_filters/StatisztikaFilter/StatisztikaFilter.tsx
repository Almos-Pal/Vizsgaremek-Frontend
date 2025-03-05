import { Form, Formik } from "formik";
import { FormikSelect } from "../../_inputs";
import { useEffect } from "react";
import { useRouter } from "next/router";
interface StatFilterProps {
    onFilterChange: (values: any) => void;
  }

  

const StatFilter: React.FC<StatFilterProps> = ({ onFilterChange }) => {
const Option = [
    {label: "week", value: "week"},
    {label: "month", value: "month"},
    {label: "halfyear", value: "halfyear"},
    {label: "all", value: "all"},
]

return (
        <Formik
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
                <Form>
                  <FormikSelect
                    name="idotartam"
                    label="Időtartam:"
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