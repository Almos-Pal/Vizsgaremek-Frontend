import { Form, Formik } from "formik";
import { FormikSelect, Input } from "../../_inputs";
import Button from "../../Button/Button";
import FormField from "../FormField/FormField";
import { GyakorlatCreate } from "@/types";
import { muscleGroups } from "@/utils";
import useGyakorlat from "@/hooks/useGyakorlat";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import { ConfirmationModal } from "../../_modal";
interface GyakorlatCreateEditFormProps {
  initialData: GyakorlatCreate;
  id?: number;
}

interface FormValues {
  fo_izomcsoport: string;
  izomcsoportok: string[];
  gyakorlat_neve: string;
  gyakorlat_leiras: string;
  eszkoz: string;
}

const GyakorlatCreateEditForm = ({ initialData ,id}: GyakorlatCreateEditFormProps) => {
  const muscleOptions = Object.entries(muscleGroups).map(([key, value]) => ({
    value: key,
    label: value
  }));

  const { mutate: createGyakorlat } = useGyakorlat.createGyakorlat();
  const {mutate: updateGyakorlat} = useGyakorlat.updateGyakorlat();
 const { mutate: deleteGyakorlat } = useGyakorlat.deleteGyakorlat();

 const router = useRouter();
 const modal = useModal();

  const initialValues: FormValues = {
    fo_izomcsoport: initialData?.fo_izomcsoport?.toString() || "",
    izomcsoportok: initialData?.izomcsoportok?.map(id => id.toString()) || [],
    gyakorlat_neve: initialData?.gyakorlat_neve || "",
    gyakorlat_leiras: initialData?.gyakorlat_leiras || "",
    eszkoz: initialData?.eszkoz || ""
  };
  const handleBack = () => {
    console.log("Back button clicked");
    router.back();
  };

  const handleModalClose = () => {
    modal.close();
    console.log("Modal closed");
    }
  const handleOpenModal = () => {
    modal.open();
    console.log("Open button clicked");

  }
  const handleDelete = () => {
    console.log("Delete button clicked");
    if (id !== undefined) {
      deleteGyakorlat(id);
    } else {
      console.error("ID is undefined, cannot delete");
    }
    router.push("/gyakorlat");
  }
  const handleSubmit = (values: FormValues) => {
    const submissionValues: GyakorlatCreate = {
      ...values,
      fo_izomcsoport: values.fo_izomcsoport ? parseInt(values.fo_izomcsoport) : 0,
      izomcsoportok: values.izomcsoportok.map(id => parseInt(id))
    };

    if (id) {
      updateGyakorlat(
        { id, values: submissionValues },
        {
          onSuccess: () => {
            router.push(`/gyakorlat/${id}`);
          },
        }
      );
    } else {
      createGyakorlat(submissionValues, {
        onSuccess: () => {
          router.push("/gyakorlat");
        },
      });
    }
    console.log("Submitted values:", submissionValues);
  };

  return (
    <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
      {({ values }) => (
        <Form>
          <div className="flex flex-col align-center justify-center gap-10 pb-14">
            <div className="flex gap-8 align-center justify-center flex-col">
              
              <FormField 
                name="gyakorlat_neve" 
                label="Gyakorlat neve" 
                as={Input} 
                isRequired 
              />

              <FormikSelect
               key="fo_izomcsoport"
                name="fo_izomcsoport"
                placeholder="Válassz izomcsoportot"
                label="Fő izomcsoport"
                isRequired
                options={muscleOptions}
              />

              <FormikSelect
               key="izomcsoportok"
                name="izomcsoportok"
                placeholder="Válassz izomcsoportokat"
                label="Izomcsoportok"
                isRequired
                options={muscleOptions}
                isMulti
              />

              <FormField 
                name="eszkoz" 
                label="Eszköz" 
                as={Input} 
              />

                  <FormField 
                name="gyakorlat_leiras" 
                label="Gyakorlat leírása" 
                as={Input} 
                textArea 
              />
            </div>
            {id && (  <Button type="button" onClick={handleOpenModal} rightIcon="TrashCanIcon" color="secondary">
              Törlés
            </Button>)}
          
            <div className="flex gap-8 align-center justify-center ">
              <Button type="button" onClick={handleBack} color="primary" additionalClassName="w-32">
                Mégse
              </Button>
              <Button type="submit" color="secondary" additionalClassName="w-32">
                {id ? "Mentés" : "Létrehozás"}
              </Button>
            </div>
       
          </div>
     
     <ConfirmationModal  visible={modal.visible} title="Biztos törölni szeretnéd a gyakorlatot?" onCancel={handleModalClose} onConfirm={handleDelete}  />
          
        </Form>
      )}
    </Formik>

  );
};

export default GyakorlatCreateEditForm;
