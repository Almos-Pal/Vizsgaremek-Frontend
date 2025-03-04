import { Form, Formik } from "formik";
import { FormikSelect } from "../../_inputs";
import { useEffect } from "react";
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
                if (values.idotartam) {
                  setFieldValue("idotartam", values.idotartam);
                  onFilterChange(values.idotartam);
                }
              
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