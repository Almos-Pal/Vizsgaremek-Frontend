"use client";
import { 
  CalendarWidget, 
  Navbar, 
  PersonalRecords, 
  Stats, 
  TodaysWorkout, 
  WeeklyTotal 
} from "@/components/client";
import * as Yup from "yup";
import styles from "./page.module.scss";

const TestPage: React.FC = () => {
  // Validation schema (unchanged)
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
  });

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.gridContainer}>
          <div className={styles.topRow}>
            <TodaysWorkout />
            <WeeklyTotal />
            <CalendarWidget />
          </div>
          <div className={styles.bottomRow}>
            <PersonalRecords />
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
