"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from './Calendar.module.scss';
import Calendar from "react-calendar";
import CalendarContainer from "./CalendarStyling";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

let datums =["2025-02-16","2025-02-19","2025-02-24"]

function CalendarWidget() {
    const router = useRouter();
      

    function handleDayClick(value: Date) {
       
        router.push(`/edzes/${value.toISOString().split('T')[0]}`);
    }


    function tileClassName({date}: {date: Date}) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let calendarDate = year + "-" + month + "-" + day;
       let help = "";
        datums.map((exerciseDate) => {
            let parsedExerciseDate = new Date(exerciseDate).toISOString().split('T')[0];
            if (parsedExerciseDate === calendarDate) {
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
        </div>
    )
}
export default CalendarWidget;