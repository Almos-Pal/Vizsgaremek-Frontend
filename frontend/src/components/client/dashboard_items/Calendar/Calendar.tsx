"use client";

import styles from "./Calendar.module.scss";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import { useEdzes, useModal } from "@/hooks";
import { Modal } from "../../_modal";
import { AddEdzesToCalendarForm } from "../../_forms";
import { useSession } from "next-auth/react";
import { time } from "@/utils";
import { Loading } from "../../Loading/Loading";
import { useEffect, useState } from "react";
import { useError } from "@/contexts/ErrorContext";

function CalendarWidget() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<string>("");
  const { data: session } = useSession();
  const { setError } = useError();
  const {
    data: edzesek,
    refetch,
    isError,
  } = useEdzes.getEdzesek({
    user_id: session?.user.user_id,
    limit: 1000,
  });

  const modal = useModal();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError, setError]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleDayClick(value: Date) {
    const matchingItems = edzesek?.items.filter((item) =>
      time.isSameDay(item.datum, value)
    );

    if (matchingItems?.length) {
      router.push(`/edzesek/${matchingItems[0].edzes_id}`);
    } else {
      const formatedDate = time.getSelectedDateAsUTC(value).toISOString();
      setCurrentDate(formatedDate);
      modal.open();
    }
  }

  function tileClassName({
    date,
    view,
    activeStartDate,
  }: {
    date: Date;
    view: string;
    activeStartDate: Date;
  }) {
    let className = "";

    edzesek?.items.forEach((exerciseDate) => {
      const parsedExerciseDate = new Date(exerciseDate.datum)
        .toISOString()
        .split("T")[0];
      if (parsedExerciseDate === time.DateParse(date)) {
        className = "highlighted";
        if (
          view === "month" &&
          date.getMonth() !== activeStartDate.getMonth()
        ) {
          className += " grey-day";
        }
      }
    });

    return className.trim();
  }

  if (!isClient) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.calendarContainer}>
        <Calendar
          onClickDay={handleDayClick}
          tileClassName={tileClassName}
          showFixedNumberOfWeeks={true}
          minDetail="month"
        />
      </div>

      <Modal
        showCloseButton={false}
        onClose={modal.close}
        allowScroll={false}
        visible={modal.visible}
        title="Válassz Edzést erre a napra"
      >
        {
          <AddEdzesToCalendarForm
            date={currentDate}
            onCancel={modal.close}
            refetch={refetch}
          />
        }
      </Modal>
    </div>
  );
}

export default CalendarWidget;
