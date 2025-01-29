"use client";
import { list } from "postcss";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from './WeeklyTotal.module.scss';
import clsx from "clsx";




function WeeklyTotal() {

    return (

        <div id="mainDiv" className={clsx(styles.mainDiv, "max-w-[270px]  max-h-[388px] w-full flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="w-full max-w-[496px]  mb-5">
                <div className="max-h-[30px] text-center">
                    <Text variant="h4"   >Heti Összesítő</Text>
                </div> 
            </div>

            <div className={clsx(styles.humanDiv,"max-w-[223px] max-h-[235px] min-w-[129px] m-full mb-5 rounded-lg")}>
                
            </div>

            <div className="">
                <Button width={"100%"} color={"secondary"} >Több a hetemről</Button>
            </div>



        </div>

    )
}

export default WeeklyTotal;