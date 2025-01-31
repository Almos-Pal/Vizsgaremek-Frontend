"use client";
import { list } from "postcss";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from './WeeklyTotal.module.scss';
import clsx from "clsx";

function WeeklyTotal() {
    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "max-w-[270px]  max-h-[388px] w-full flex flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="w-full max-w-[496px]  mb-5">
                <div className="max-h-[30px] text-center">
                    <Text variant="h4">Heti Összesítő</Text>
                </div> 
            </div>
                <div className={clsx(styles.humanDiv,"max-w-[223px] h-full max-h-[235px] flex min-w-[129px] w-full mb-3 ml-1 rounded-lg")}> 
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_PtzGb9XgU_eXXauI4a56O3yuB5wqCpD2IZyFeMLFOsCoYnB72WUHnu7N7jhDMdlmyc&usqp=CAU" alt="" />
            </div>
            <div className=" flex justify-center">
                <Button  color={"secondary"} >Több a hetemről</Button>
            </div>
        </div>
    )
}

export default WeeklyTotal;