"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from './Calendar.module.scss';
import Calendar from "react-calendar";
import CalendarContainer from "./CalendarStyling";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarWidget() {
    const router = useRouter();

    function handleDayClick(value: Date) {
        router.push(`/edzes/${value.toISOString().split('T')[0]}`);
    }

    const [value, onChange] = useState<Value>(new Date());
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[360px]  max-w-[325px] w-full flex flex-col m-2.5 p-0 rounded-lg ")}>            
                <CalendarContainer>
                 {isClient ? (<Calendar onChange={onChange}  onClickDay={handleDayClick} value={value} />) : (<p>Loading</p>)}
                 </CalendarContainer>

        </div>
    )
}
export default CalendarWidget;