import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../../Button/Button";
import { Input } from "../../_inputs";
import FormField from "../../_forms/FormField/FormField";

interface RecordsFilterProps {
    onFilterChange: (values: any) => void;
}

const RecordsFilter: React.FC<RecordsFilterProps> = ({onFilterChange}) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const initialValues = {
    search: searchParams.get("search") || "",
    
    }


    const handleSubmit = (values: any) => {
    const queryParams = new URLSearchParams();

    if (values.search?.trim()) queryParams.set("search", values.search.trim());
    if (queryParams.toString()) {
        queryParams.set("page", "1");
      }

      const queryString = queryParams.toString();
      router.push(queryString ? `?${queryString}` : window.location.pathname);
      onFilterChange(values);
    }


    return (
        <div>
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
                  name="search" 
                  label="Gyakorlat neve:" 
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
    )
}

export default RecordsFilter;