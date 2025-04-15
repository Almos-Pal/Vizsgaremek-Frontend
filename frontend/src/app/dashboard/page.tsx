"use client";
import styles from "./page.module.scss";
import {
  WeeklyTotal,
  Stats,
  PersonalRecords,
  Calendar,
  TodaysWorkout,
} from "@/components/client/dashboard_items";
import { ErrorProvider, useError } from "@/contexts/ErrorContext";
import ErrorPage from "@/components/client/ErrorPage/Error";
import { Navbar } from "@/components/client";

function DashboardContent() {
  const { hasError } = useError();

  if (hasError) {
    return <ErrorPage />;
  }

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
              <Calendar />
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
}

export default function Dashboard() {
  return (
    <ErrorProvider>
      <DashboardContent />
    </ErrorProvider>
  );
}
