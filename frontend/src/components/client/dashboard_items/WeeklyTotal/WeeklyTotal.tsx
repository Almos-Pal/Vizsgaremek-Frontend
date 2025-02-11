"use client";
import { list } from "postcss";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from './WeeklyTotal.module.scss';
import clsx from "clsx";

function WeeklyTotal() {
    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[270px] max-w-[325px] w-full flex flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="w-full max-w-[500px]  mb-5">
                <div className="max-h-[30px] text-center">
                    <Text variant="h4">Heti Összesítő</Text>
                </div> 
            </div>
                <div className={clsx(styles.humanDiv,"max-w-[300px] sm:flex hidden justify-center min-w-[130px] w-full sm:mb-3 mb-8 ml-0 rounded-lg")}> 
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_PtzGb9XgU_eXXauI4a56O3yuB5wqCpD2IZyFeMLFOsCoYnB72WUHnu7N7jhDMdlmyc&usqp=CAU" alt="" />
            </div>
            <div className={clsx(styles.humanDiv,"max-w-[300px] sm:hidden flex justify-center min-w-[130px] w-full sm:mb-3 mb-8 ml-0 rounded-lg")}> 
                    <a href={"/gyakorlat"}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_PtzGb9XgU_eXXauI4a56O3yuB5wqCpD2IZyFeMLFOsCoYnB72WUHnu7N7jhDMdlmyc&usqp=CAU" alt="" />
                    </a>
            </div>
            <div className="sm:visible hidden sm:flex justify-center">
                <Button  color={"secondary"} href={"/osszesito"} >Több a hetemről</Button>
            </div>
        </div>
    )
}

export default WeeklyTotal;