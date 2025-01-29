import { Form, Formik } from "formik";
import { SubHeader } from "../../_common";
import FormField from "../../_forms/FormField/FormField";
import Input from "../../_inputs/Input/Input";
import Button from "../../Button/Button";
import { FormikSelect } from "../../_inputs";
import useGyakorlat from "@/hooks/useGyakorlat";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface GyakorlatFilterProps {
  onFilterChange: (values: any) => void;
}

const GyakorlatFilter: React.FC<GyakorlatFilterProps> = ({ onFilterChange }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialValues = {
    nev: searchParams.get("nev") || "",
    izomcsoportId: searchParams.get("izomcsoportId") || "",
    izomcsoportok: searchParams.get("izomcsoportok")?.split(",").filter(Boolean) || [],
    eszkoz: searchParams.get("eszkoz") || "",
  };

  const { data: izomcsoportok } = useGyakorlat.getIzomcsoportok();

  const handleSubmit = (values: any) => {
    const queryParams = new URLSearchParams();
    
    if (values.nev?.trim()) queryParams.set("nev", values.nev.trim());
    if (values.izomcsoportId) queryParams.set("izomcsoportId", values.izomcsoportId);
    if (values.izomcsoportok?.length) queryParams.set("izomcsoportok", values.izomcsoportok.join(","));
    if (values.eszkoz?.trim()) queryParams.set("eszkoz", values.eszkoz.trim());
    
    if (queryParams.toString()) {
      queryParams.set("page", "1");
    }

    const queryString = queryParams.toString();
    router.push(queryString ? `?${queryString}` : window.location.pathname);
    onFilterChange(values);
  };

  const izomcsoportOptions = izomcsoportok?.map((izomcsoport: any) => ({
    value: izomcsoport.izomcsoport_id.toString(),
    label: izomcsoport.nev
  })) || [];

  return (
    <div>
      <SubHeader header="Filterek" />

      <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            <div className="flex flex-col align-center justify-center gap-10 pb-14">
              <div className={"flex gap-8 align-center justify-center flex-col"}>
                <FormField 
                  name="nev" 
                  label="Gyakorlat neve:" 
                  as={Input} 
                />

                <FormikSelect
                  name="izomcsoportId"
                  placeholder="Válassz fő izomcsoportot"
                  label="Fő izomcsoport szerint:"
                  options={izomcsoportOptions}
                  isClearable
                />

                <FormikSelect
                  name="izomcsoportok"
                  placeholder="Válassz izomcsoportokat"
                  label="Izomcsoportok:"
                  options={izomcsoportOptions}
                  isMulti
                  isClearable
                />

                <FormField 
                  name="eszkoz" 
                  label="Eszköz szerint:" 
                  as={Input} 
                />
              </div>

              <Button type="submit" rightIcon="SearchIcon" color="secondary">
                Keresés
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GyakorlatFilter;
