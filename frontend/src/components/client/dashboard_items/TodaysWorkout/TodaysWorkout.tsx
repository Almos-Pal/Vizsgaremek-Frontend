"use client";
import { list } from "postcss";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from './TodaysWorkout.module.scss';
import clsx from "clsx";
import { SearchIcon } from "@/components/server/Icons";
import { useState } from "react";


interface WorkoutProps {
    name: string;
    sets: number;
    reps: number;
}

function TodaysWorkout() {
    let list: WorkoutProps[] = [
        {

            name: "Bench Press",
            sets: 3,
            reps: 10
        },
        {
            name: "Squats",
            sets: 3,
            reps: 10
        },
        {
            name: "Deadlifts",
            sets: 3,
            reps: 10
        },
        {
            name: "Pullups",
            sets: 3,
            reps: 10
        },
        {
            name: "Pushups",
            sets: 3,
            reps: 10
        },
    ]

    const [human, setHuman] = useState(false)
    function switchHuman() {
        setHuman(!human)
        console.log(human)
    }
    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "sm:max-w-[500px] max-w-[325px] flex flex-wrap sm:flex-nowrap sm:flex-col sm:justify-normal justify-center  sm:m-2.5 sm:p-5 rounded-lg ")}>
            <div className="w-full max-w-[500px] flex-row mb-8">
                <div className="max-h-[30px] text-center">
                    <Text variant="h4">Mai Edzés</Text>
                </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-center  max-w-[500px]">
                <div className="max-w-[300px]  hidden  sm:flex sm flex-wrap justify-center flex-row mr-4 p-0 ">
                    <div className="mr-6">
                        {
                            list.slice(0, 5).map((item) => {
                                return (
                                    <div key={item.name} className=" max-h-[25px] flex flex-row justify-between gap-0 mb-5 pl-3 ">
                                        <div className="flex flex-row min-w-[150px]  ">
                                            <Text variant="body-16">{item.name}</Text>
                                        </div>
                                        <div className="flex flex-row min-w-[105px]  ">
                                            <div className=" w-full text-right">
                                                <Text variant="body-16" >{item.sets}x{item.reps}</Text>
                                            </div>
                                        </div >
                                    </div>

                                )
                            })
                        }
                    </div>
                    {
                        list.length - 5 > 0 &&
                        <div className="w-max-[200px]">
                            <Button width={"100%"} color={"secondary"} >További Gyakorlatok: {list.length - 5}</Button>
                        </div>
                        ||
                        <div className="w-max-[200px]">
                            <Button width={"100%"} color={"secondary"} >Gyakorlatok</Button>
                        </div>
                    }
                </div>
                <div className="max-w-[300px] min-w-[300px] sm:hidden visible w-full flex flex-row justify-center mr-4 p-0 ">
                    <div className="mr-6 flex flex-col gap-5">
                        {
                            list.slice(0, 3).map((item) => {
                                return (
                                    <div key={item.name} className=" max-w-[300px] flex flex-row justify-between  gap-10 ">
                                        <div className="content-start">
                                            <Text variant="body-16">{item.name}</Text>
                                        </div>
                                        <div className="justify-end">
                                            <Text variant="body-16" >{item.sets}x{item.reps}</Text>
                                        </div >
                                    </div>

                                )
                            })
                        }
                        {
                            list.length - 3 > 0 &&
                            //<Text variant="caption" className="text-pretty mt-0 underline">További gyakorlatok: {list.length - 3}</Text>
                            <a className={styles.aClass}>További gyakorlatok: {list.length - 3}</a>
                            ||
                            <a className={styles.aClass}>Gyakorlatok</a>
                        }
                    </div>
                    {
                        list.length - 5 > 0 &&
                        <div className="sm:visible hidden">
                            <Button width={"100%"} color={"secondary"} >További gyakorlatok: {list.length - 5}</Button>
                        </div>
                        ||
                        <div className="sm:visible hidden">
                            <Button width={"100%"} color={"secondary"} >Gyakorlatok</Button>
                        </div>
                    }
                </div>
                <div className={clsx(styles.humanDiv, "max-w-[300px] min-w-[200px] w-full sm:grid grid-rows-5 grid-cols-12 hidden justify-center sm:p-0 sm:m-0   rounded-lg")}>
                    <div className={clsx(styles.leftbuttonDesk, "justify-self-end")}>
                        <Button onClick={switchHuman} color="secondary" width={"40px"} style={{ borderRadius: "50%", width: "30px", height: "40px", padding: "0" }} iconOnly leftIcon="ArrowLeftIcon"></Button>
                    </div>
                    {
                        human == false &&
                        <div className={styles.humanDeskA}>
                        </div>
                        ||
                        <div className={styles.humanDeskB}>
                        </div>
                    }
                    <div className={clsx(styles.rightbuttonDesk, "justify-self-start")}>
                        <Button onClick={switchHuman} color="secondary" width={"40px"} style={{ borderRadius: "50%", width: "30px", height: "40px", padding: "0" }} iconOnly leftIcon="ArrowRightIcon"></Button>
                    </div>
                </div>
                <div className={clsx(styles.humanDiv, "min-h-[300px] sm:hidden grid grid-rows-5 grid-cols-12  ml-0 mb-3 rounded-lg mr-4 ")}>
                    <div className={clsx(styles.leftbutton, "justify-self-end")}>
                        <Button onClick={switchHuman} color="secondary" width={"40px"} style={{ borderRadius: "50%", width: "30px", height: "40px", padding: "0" }} iconOnly leftIcon="ArrowLeftIcon"></Button>
                    </div>
                    {
                        human == false &&
                        <div className={styles.humanA}>
                        </div>
                        ||
                        <div className={styles.humanB}>
                        </div>
                    }
                    <div className={clsx(styles.rightbutton, "justify-self-start")}>
                        <Button onClick={switchHuman} color="secondary" width={"40px"} style={{ borderRadius: "50%", width: "30px", height: "40px", padding: "0" }} iconOnly leftIcon="ArrowRightIcon" iconProps={{ "size": 25 }}></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodaysWorkout;