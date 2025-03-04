"use client";
import { Button, StatFilter } from "@/components/client";
import Flag from "@/components/server/Flags/Flag";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Text ,Icons} from "@/components/server";
import { Form, Formik } from "formik";
import {useEdzes} from "@/hooks/index";

import * as Yup from "yup";
import BodySVG from "@/components/server/BodySVG/BodySVG";
import {  useState } from "react";
import { useToast } from "@/hooks";
import { FormikSelect } from "@/components/client/_inputs";

const TestPage: React.FC = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
  }); 

  const toast = useToast();
//  const [state, setState] = useState("front");

  const handleClick = () => {
    toast.info("asd");
  }



const {data:data,refetch} = useEdzes.getEdzesByType(10,"all")
  const handleFilterChange = (values: any) => {
    refetch()
    console.log(data)
  };
  return (
    
    <div className="flex flex-wrap">
      <StatFilter onFilterChange={handleFilterChange}/>

      <Text variant="h1">Test Page</Text>
      <Text variant="h2">Test Page</Text>
      <Text variant="h3">Test Page</Text>
      <Text variant="h4">Test Page</Text>
      <Text variant="h5">Test Page</Text>
      <Text variant="subtitle-15">Test Page</Text>
      <Text variant="body-15">Test Page</Text>
      <Text variant="subtitle-16">Test Page</Text>
      <Text variant="body-16">Test Page</Text>
      <Text variant="button">Test Page</Text>
      <Text variant="caption">Test Page</Text>
      <div className="flex flex-row gap-2 flex-wrap ">
        <Button>Test Button</Button>
        <Button leftIcon="ArrowLeftIcon" >Test Button</Button>
        <Button iconOnly leftIcon="ArrowLeftIcon" />
        <Button color="secondary">Test Button</Button>
        <Button color="secondary" leftIcon="ArrowLeftIcon">
          Test Button
        </Button>
        <Button color="secondary" iconOnly leftIcon="ArrowLeftIcon" />
      </div>

      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          toast.success("asd");
          console.log(values);
        }}
      >
        <Form>
          <div className="w-48">
            <FormField
              name="name"
              as={Input}
              type="password"
              label={"Hello"}
              placeholder={"Write here..."}
            />
          </div>
          <Button color="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>

        <Button onClick={handleClick}>Toast</Button>
      
      <Icons.WarningIcon  size={100}  />
      <Icons.InfoIcon  size={100}  />
      <Icons.CancelIcon  size={100}  />
      <Icons.CheckIcon  size={100}  />
      <Icons.AddIcon  size={100}  />
      <Icons.MinusIcon  size={100}  />
      <Icons.ArrowLeftIcon  size={100}  />
      <Icons.ArrowRightIcon  size={100}  />
      <Icons.CalendarIcon  size={100}  />
      <Icons.ChartIcon  size={100}  />
      <Icons.CancelIcon  size={100}  />
      <Icons.EditIcon  size={100}  />
      <Icons.MenuIcon  size={100}  />
      <Icons.PlayLeftIcon  size={100}  />
      <Icons.PlayRightIcon  size={100}  />
      <Icons.ProfileIcon  size={100}  />
      <Icons.SearchIcon  size={100}  />
      <Icons.SettingsIcon  size={100}  />
      <Icons.VisibilityOffIcon  size={100}  />
      <Icons.VisibilityOnIcon  size={100}  />
      <Icons.TrashCanIcon  size={100}  />
      <Icons.PlayUpIcon  size={100}  />
      <Icons.PlayDownIcon  size={100}  />
      <BodySVG 
  size={300}
  
  view={"front"} // "front" or "back"
  selectedMuscleIds={[4]} // Primary highlights (hasizom, mellizom)
  secondaryMuscleIds={[2, 6]} // Secondary highlights (combhajlito, tricepsz)
  highlightColor="var(--color-error)" // Primary highlight color
  secondaryHighlightColor="var(--color-warning)" // Secondary highlight color
/>
<div>
  <Flag izomcsoportok={[1,2,3,4]} foizomcsoport={8} />
  
</div>

    </div>
  );
};
export default TestPage;
