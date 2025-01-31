"use client";

import { Button } from "../../index";
import { Icons, Text } from "@/components/server";
import styles from './Stats.module.scss';
import clsx from "clsx";

function Stats() {

    return (

        <div id="mainDiv" className={clsx(styles.mainDiv, "max-w-[496px]  max-h-[291px] w-full flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="mb-5">
                <Text variant="h4" className="max-w-[496px] text-center">Statisztika</Text>
            </div>
            <div className="flex flex-row justify-between gap-8">

            <div className={clsx(styles.humanDiv, "max-w-[211px] min-h-[130px] min-w-[129px] w-full ml-0 rounded-lg")}></div>
            
            <div className={clsx(styles.humanDiv, "max-w-[211px] min-h-[130px] min-w-[129px] w-full ml-0 rounded-lg")}></div>
            
            </div>
            <div className="flex justify-center mt-5">
                <Button color={"secondary"} rightIcon="SearchIcon" ><Text variant="button">Statisztikák</Text> </Button>
            </div>

        </div>
    )

}

export default Stats;