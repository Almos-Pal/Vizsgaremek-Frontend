"use client";
import {
  CalendarWidget,
  Navbar,
  PersonalRecords,
  Stats,
  TodaysWorkout,
  WeeklyTotal,
} from "@/components/client";
import styles from "./page.module.scss";
import { BACKEND_URL } from "@/utils";

const Dashboard: React.FC = () => {
  console.log(BACKEND_URL);
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.dashboard}>
          <div className={styles.topRow}>
            <div className={styles.todaysWorkout}>
              <TodaysWorkout />
            </div>
            <div className={styles.weeklyTotal}>
              <WeeklyTotal />
            </div>
            <div className={styles.calendar}>
              <CalendarWidget />
            </div>
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.personalRecords}>
              <PersonalRecords />
            </div>
            <div className={styles.stats}>
              <Stats />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
