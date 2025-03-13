"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from './Calendar.module.scss';
import Calendar from "react-calendar";
import CalendarContainer from "./CalendarStyling";
import { useRouter } from "next/navigation";
import { useEdzes, useModal } from "@/hooks";
import { ConfirmationModal, Modal } from "../../_modal";
import { AddEdzesToCalendarForm } from "../../_forms";
import { useSession } from "next-auth/react";
import { time } from "@/utils";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

let datums =["2025-02-16","2025-02-19","2025-02-24"]

function CalendarWidget() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState<string>("");
    const { data: session } = useSession()
    const {data:edzesek, refetch} = useEdzes.getEdzesek({
        user_id: session?.user.user_id,
        limit: 1000,
    });
      
    const modal = useModal();

    function handleDayClick(value: Date) {
        console.log(value);
        const matchingItems = edzesek?.items.filter(item => time.isSameDay(item.datum, value));

        if (matchingItems?.length) {
            // Assuming each item has an 'id' field
            const matchingIds = matchingItems.map(item => item.edzes_id);
            console.log("Matching IDs:", matchingIds);
    
            // Redirect using the first matching ID (or handle multiple IDs as needed)
            router.push(`/edzes/${matchingIds[0]}`);
        }
        else{

            
            const formatedDate = time.getSelectedDateAsUTC( value).toISOString();
            
            console.log(formatedDate);
            setCurrentDate(formatedDate);
            modal.open();
        }

        // router.push(`/edzes/${DateParse(value)}`);
    }

    const handleModalCancel = () => {
        modal.close();
    }

    const handleModalConfirm = () => {
        console.log("submit");
    
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
      
        // Highlight dates from edzesek
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
      
      
      

    const [value, onChange] = useState<Value>(new Date());
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[360px]  max-w-[325px] w-full flex flex-col m-2.5 p-0 rounded-lg ")}>            
                <CalendarContainer>
                 {isClient ? (<Calendar onChange={onChange}  onClickDay={handleDayClick}  tileClassName={tileClassName} value={value} />) : (<p>Loading</p>)}
                 </CalendarContainer>
        <Modal  children={<AddEdzesToCalendarForm  date={currentDate}onCancel={handleModalCancel} refetch={refetch} />} showCloseButton={false}  onClose={handleModalCancel}  visible={modal.visible} title="Válasz Edzést erre a napra"  /> 

        </div>
    )
}
export default CalendarWidget;