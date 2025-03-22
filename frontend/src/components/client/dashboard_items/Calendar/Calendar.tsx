"use client";

import styles from './Calendar.module.scss';
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import { useEdzes, useModal } from "@/hooks";
import { Modal } from "../../_modal";
import { AddEdzesToCalendarForm } from "../../_forms";
import { useSession } from "next-auth/react";
import { time } from "@/utils";
import { Loading } from "../../Loading/Loading";
import { useEffect, useState } from "react";

function CalendarWidget() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState<string>("");
    const { data: session } = useSession();
    const { data: edzesek, refetch } = useEdzes.getEdzesek({
        user_id: session?.user.user_id,
        limit: 1000,
    });
    
    const modal = useModal();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    function handleDayClick(value: Date) {
        const matchingItems = edzesek?.items.filter(item => 
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

    function tileClassName({ date, view, activeStartDate }: {
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
                if (view === "month" && date.getMonth() !== activeStartDate.getMonth()) {
                    className += " grey-day";
                }
            }
        });
        
        return className.trim();
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.calendarContainer}>
                {isClient ? (
                    <Calendar
                        onClickDay={handleDayClick}
                        tileClassName={tileClassName}
                        showFixedNumberOfWeeks={true}
                        minDetail="month"
                    />
                ) : (
                    <Loading hasParent />
                )}
            </div>
            
            <Modal
                children={
                    <AddEdzesToCalendarForm
                        date={currentDate}
                        onCancel={modal.close}
                        refetch={refetch}
                    />
                }
                showCloseButton={false}
                onClose={modal.close}
                allowScroll={false}
                visible={modal.visible}
                title="Válassz Edzést erre a napra"
            />
        </div>
    );
}

export default CalendarWidget;