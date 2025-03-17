"use client";
import {CalendarWidget,PersonalRecords,Stats,TodaysWorkout, WeeklyTotal } from "@/components/client";

import * as Yup from "yup";

const TestPage: React.FC = () => {
  //Dont touch this
  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  });
  return (
    <div className="max-w-[1440px] flex justify-center w-full  flex-wrap  sm:flex-row  sm:justify-normal sm:overflow-y-hidden"  >
      <TodaysWorkout/>
      <WeeklyTotal/>
      <CalendarWidget/>
      <PersonalRecords/>
      <Stats/>
    </div>
  );
};
export default TestPage;
