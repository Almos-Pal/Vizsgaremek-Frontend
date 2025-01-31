"use client";
import { list } from "postcss";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from './TodaysWorkout.module.scss';
import clsx from "clsx";


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
    return (
        <div id="mainDiv" className={clsx(styles.mainDiv, "max-w-[496px]  max-h-[388px] w-full flex-wrap m-2.5 p-5 rounded-lg ")}>
            <div className="w-full max-w-[496px] flex-row mb-8">
                <div className="max-h-[30px] text-center">
                    <Text variant="h4"   >Mai Edzés</Text>
                </div>
            </div>
            <div className="max-w-[496px]  max-h-[285px] flex flex-row basis-full gap-2 p-0">
                <div className="max-w-[300px]  max-h-[388px] w-full basis-2/3 flex-row mr-4 p-0 ">
                    <div className="mr-6">
                        {
                            list.slice(0, 5).map((item) => {
                                return (
                                    <div key={item.name} className=" max-h-[22.77px] flex flex-row mt-0 mb-6 p-0  ">
                                        <div className="flex flex-row max-w-[150px] mr-0  pr-0 w-full">
                                            <Text variant="body-16">{item.name}</Text>
                                        </div>
                                        <div className="flex flex-row max-w-[105px]  ml-0 w-full">
                                            <div className=" w-full sm:text-right">
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
                        <div className="">
                            <Button width={"100%"} color={"secondary"} >További Gyakorlatok: {list.length - 5}</Button>
                        </div>
                        ||
                        <div className="">
                            <Button width={"100%"} color={"secondary"} >Gyakorlatok</Button>
                        </div>
                    }
                </div>
                <div className={clsx(styles.humanDiv, "max-w-[162px] max-h-[285px] min-w-[129px]  flex-row basis-1//3 ml-0 rounded-lg mr-4 ")}></div>
            </div>
        </div>
    )
}

export default TodaysWorkout;