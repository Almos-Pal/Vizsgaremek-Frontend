"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from './Calendar.module.scss';
import Calendar from "react-calendar";
import CalendarContainer from "./CalendarStyling";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function consoleling(value: Date) {
    console.log(value.getFullYear(), value.getMonth()+1, value.getDate());
    
}

function CalendarWidget() {
    const [value, onChange] = useState<Value>(new Date());
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[360px]  max-w-[325px] w-full flex flex-col m-2.5 p-0 rounded-lg ")}>            
                <CalendarContainer>
                 {isClient ? (<Calendar onChange={onChange} onClickDay={consoleling.bind(value)} value={value} />) : (<p>Loading</p>)}
                 </CalendarContainer>
        </div>
    )
}
export default CalendarWidget;