"use client";
import { Button,CalendarWidget,TodaysWorkout, WeeklyTotal } from "@/components/client";
import FormField from "@/components/client/_forms/FormField/FormField";
import Input from "@/components/client/_inputs/Input/Input";
import { Text ,Icons} from "@/components/server";
import { Form, Formik } from "formik";

import * as Yup from "yup";

const TestPage: React.FC = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
  });
  return (
    <div>
      <div className="max-w-[1440] max-h-[768] flex">
     <TodaysWorkout/>
     <WeeklyTotal/>
      <CalendarWidget/>
      
      </div>



    </div>
  );
};
export default TestPage;
