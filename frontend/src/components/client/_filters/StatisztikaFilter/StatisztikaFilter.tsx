import { Form, Formik } from "formik";
import { FormikSelect } from "../../_inputs";

function StatFilter(){
const Option = [
    {label: "week", value: "week"},
    {label: "month", value: "month"},
    {label: "halfyear", value: "halfyear"},
    {label: "all", value: "all"},
]
return (
    <div className={styles.container}>
      <div className={styles.main}>

        <Formik
          initialValues={{ idotartam: "" }}
          onSubmit={() => { }}
        >
          {({ setFieldValue, values }) => {
            useEffect(() => {
              if (values.gyakorlat) {
                if (values.gyakorlat?.trim()) queryParams.set("gyakorlat_id", values.gyakorlat.trim());
                const queryString = queryParams.toString();
                router.push(queryString ? `?${queryString}` : window.location.pathname);
                setSelectedGyakorlat(parseInt(values.gyakorlat));
              }
            }, [values.gyakorlat]);

            return (
              <>
                <Form className={styles.form}>
                  <label>
                    <Text variant="caption">Gyakorlat:</Text>
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
      </div>
    </div>
  );

}
    export default StatFilter;