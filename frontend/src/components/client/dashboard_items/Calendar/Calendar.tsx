"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from './Calendar.module.scss';
import Calendar from "react-calendar";
import CalendarContainer from "./CalendarStyling";
import { useRouter } from "next/navigation";
import { DateParse } from "@/utils";
import { useModal } from "@/hooks";
import { ConfirmationModal, Modal } from "../../_modal";
import { AddEdzesToCalendarForm } from "../../_forms";
import { useSession } from "next-auth/react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

let datums =["2025-02-16","2025-02-19","2025-02-24"]

function CalendarWidget() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState<string>("");
      
    const modal = useModal();

    function handleDayClick(value: Date) {
        const formatedDate = value.toISOString();
        setCurrentDate(formatedDate);
        modal.open();

        // router.push(`/edzes/${DateParse(value)}`);
    }

    const handleModalCancel = () => {
        modal.close();
    }

    const handleModalConfirm = () => {
        console.log("submit");
    
    }

    function tileClassName({date}: {date: Date}) {
       let help = "";
        datums.map((exerciseDate) => {
            let parsedExerciseDate = new Date(exerciseDate).toISOString().split('T')[0];
            if (parsedExerciseDate === DateParse(date)) {
              help = "highlighted";
            }
        })
        return help
        
      }

    const [value, onChange] = useState<Value>(new Date());
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[360px]  max-w-[325px] w-full flex flex-col m-2.5 p-0 rounded-lg ")}>            
                <CalendarContainer>
                 {isClient ? (<Calendar onChange={onChange}  onClickDay={handleDayClick} tileClassName={tileClassName} value={value} />) : (<p>Loading</p>)}
                 </CalendarContainer>
        <Modal  children={<AddEdzesToCalendarForm  date={currentDate}onCancel={handleModalCancel} onAdd={handleModalConfirm} />} showCloseButton={false}  onClose={handleModalCancel}  visible={modal.visible} title="Válasz Edzést erre a napra"  /> 

        </div>
    )
}
export default CalendarWidget;