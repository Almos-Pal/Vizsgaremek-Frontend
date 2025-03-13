import { Formik, Form } from "formik";
import { FormikSelect } from "../../_inputs";
import Button from "../../Button/Button";
import { useEdzes, useToast } from "@/hooks";
import styles from "./AddEdzesToCalendarForm.module.scss";
import { useSession } from "next-auth/react";
import { edzesfromTemplateSchema } from "@/utils/Validations/edzesfromTemplateSchema";
import { time } from "@/utils";

interface AddEdzesToCalendarFormProps {
  onCancel: () => void;
    date: string;
    refetch: () => void;
}

interface FormValues {
    templateId: string;
}

const AddEdzesToCalendarForm: React.FC<AddEdzesToCalendarFormProps> = ({
  date,
  onCancel,
  refetch,
}) => {
  const initialValues: FormValues = { templateId: "" };
  const {data: session} = useSession();

  const { data: edzesTemplates } = useEdzes.getEdzesek({
    limit: 1000,
    isTemplate: true,
    user_id: session?.user.user_id,
  });
  const {mutate: createEdzesFromTemplate} = useEdzes.createEdzesFromTemplate();
const toast = useToast();
  const edzesOptions =
    edzesTemplates?.items?.map((edz: any) => ({
      value: edz.edzes_id.toString(),
      label: edz.edzes_neve,
    })) || [];

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    console.log("Submitting with values:", values);
   createEdzesFromTemplate({templateId: parseInt(values.templateId), userId:session!.user.user_id,  date: date}, {
        onSuccess: (edzes) => {
            toast.success(`Az edzésterv sikeresen létrejött ${time.formatHungarianDate(date)}-ra`);
            refetch();

           onCancel();

        },
        onError: (error) => {
            toast.error("Hiba történt az edzés létrehozása közben");
            console.error("Error creating edzes:", error);
        },
        });
        
 
    setSubmitting(false);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={edzesfromTemplateSchema}>
        {({ isSubmitting }) => (
          <Form style={{ marginTop: "1rem" }}>
            <div className={styles.formContainer}>
              <div className={styles.selectWrapper}>
                <FormikSelect
                  name="templateId"
                  placeholder="Válassz edzéstervet"
                  label="Edzéstervek:"
                  isRequired
                  options={edzesOptions}
                  isClearable
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonGroup}>
                <Button type="button" onClick={onCancel} color="primary">
                  Mégse
                </Button>
                <Button type="submit" disabled={isSubmitting} color="secondary">
                  Létrehozás
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEdzesToCalendarForm;
