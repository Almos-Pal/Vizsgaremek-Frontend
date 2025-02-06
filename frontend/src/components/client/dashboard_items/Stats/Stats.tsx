"use client";

import { Button } from "../../index";
import { Icons, Text } from "@/components/server";
import styles from './Stats.module.scss';
import clsx from "clsx";

function Stats() {

    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[500px]  max-w-[325px] w-full flex flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="mb-5">
                <Text variant="h4" className="max-w-[500px] text-center">Statisztika</Text>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between ml-8 sm:ml-0 sm:gap-8 gap-6">

            <div className={clsx(styles.humanDiv, "max-w-[220px]  min-h-[130px] min-w-[130px] w-full sm:ml-0  rounded-lg")}></div>
            
            <div className={clsx(styles.humanDiv, "max-w-[220px]  min-h-[130px] min-w-[130px] w-full sm:ml-0  rounded-lg")}></div>
            
            </div>
            <div className="flex justify-center mt-5">
                <Button color={"secondary"} rightIcon="SearchIcon" >Statisztikák</Button>
            </div>
        </div>
    )
}
export default Stats;