import { Formik, Form } from "formik";
import { SubHeader } from "../../_common";
import FormField from "../../_forms/FormField/FormField";
import Button from "../../Button/Button";
import { FormikSelect, Input } from "../../_inputs";
import { useRouter, useSearchParams } from "next/navigation";

interface UserFilterProps {
    onFilterChange: (values: any) => void;
  }

  const UserFilter: React.FC<UserFilterProps> = ({ onFilterChange }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
  
    const initialValues = {
      username: searchParams.get("username") || "",
      email: searchParams.get("email") || "",
      isAdmin: searchParams.get("isAdmin") || "",
    };
  
    const handleSubmit = (values: any) => {
      const queryParams = new URLSearchParams();
      
      if (values.username?.trim()) queryParams.set("username", values.username.trim());
      if (values.email?.trim()) queryParams.set("email", values.email.trim());
      if (values.isAdmin?.trim()) queryParams.set("isAdmin", values.isAdmin.trim());
      
      if (queryParams.toString()) {
        queryParams.set("page", "1");
      }
  
      const queryString = queryParams.toString();
      router.push(queryString ? `?${queryString}` : window.location.pathname);
      onFilterChange(values);
    };
  
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
                    name="username" 
                    label="Felhasználónév:" 
                    as={Input} 
                  />
  
                  <FormField 
                    name="email" 
                    label="Email:" 
                    as={Input} 
                  />
  
             
                  <FormikSelect
                     name="isAdmin" 
                     label="Admin jog:" 
                     notFoundMessage="Nincs ilyen jogosultság!"
                     options={[
                       { label: "Admin", value: "true" },
                       { label: "Felhasználó", value: "false" },
                     ]}
                     isClearable
                  placeholder="Válasszon jogosultságot"

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
  }

  export default UserFilter;