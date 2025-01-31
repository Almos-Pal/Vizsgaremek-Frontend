"use client";

import clsx from "clsx";
import { useState } from "react";
import styles from './Calendar.module.scss';
import Calendar from "react-calendar";
import CalendarContainer from "./CalendarStyling";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


function CalendarWidget() {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "max-w-[360px]  max-h-[388px] w-full flex-col m-2.5 p-0 rounded-lg ")}>
    <CalendarContainer>
      <Calendar   onChange={onChange} value={value} />
    </CalendarContainer>


        </div>

    )
}

export default CalendarWidget;