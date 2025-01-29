import { Form, Formik } from "formik";
import { SubHeader } from "../../_common";
import FormField from "../../_forms/FormField/FormField";
import Input from "../../_inputs/Input/Input";
import Button from "../../Button/Button";
import { FormikSelect } from "../../_inputs";
import useGyakorlat from "@/hooks/useGyakorlat";

interface GyakorlatFilterProps {
  filter?: string;
}

const GyakorlatFilter: React.FC<GyakorlatFilterProps> = ({ filter }) => {
  const initialValues = {
    name: "",
    filter: [], // Multi-select initializes with an empty array
  };



  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
  };

  return (
    <div>
      <SubHeader header="Filterek" />

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex flex-col align-center justify-center gap-10 pb-14" >

            <div className={"flex gap-8 align-center justify-center flex-col"}>

            <FormField name="name" label={"Gyakorlat neve:"} as={Input} />

            <FormikSelect
              name="fo_izomcsoport"
              placeholder="Szűrő"
              label="Fő izomcsoport szerint:"
              options={[
                { value: "1", label: "Egy" },
                { value: "2", label: "Kettő" },
                { value: "3", label: "Három" },
              ]}
            />
            <FormikSelect
              name="izomcsoportok"
              placeholder="Szűrő"
              label="Izomcsoportok:"
              options={[
                { value: "1", label: "Egy" },
                { value: "2", label: "Kettő" },
                { value: "3", label: "Három" },
              ]}
              isMulti
            />
            <FormField name="eszkoz" label={" Eszköz szerint:"} as={Input} />
            </div>

            <Button type="submit" rightIcon="SearchIcon" color="secondary">Keresés</Button>
              </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GyakorlatFilter;
