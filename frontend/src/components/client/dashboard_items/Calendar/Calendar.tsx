"use client";
import { list } from "postcss";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from './Calendar.module.scss';
import Calendar from 'react-calendar';
import clsx from "clsx";
import { useState } from "react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


function CalendarWidget() {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "max-w-[270px]  max-h-[388px] w-full flex-col m-2.5 p-5 rounded-lg ")}>

    <Calendar className={clsx(styles)}  onChange={onChange} value={value} />

        </div>

    )
}

export default CalendarWidget;