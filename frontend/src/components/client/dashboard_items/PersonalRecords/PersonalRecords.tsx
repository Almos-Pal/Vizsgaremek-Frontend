"use client";
import { Button } from "../../index";
import { Text } from "@/components/server";
import styles from './PersonalRecords.module.scss';
import clsx from "clsx";
interface RekordokProps {
    name: string,
    sets: number,
    reps: number,
    weight: number
}
let list: RekordokProps[] = [
    {
        name: "Berntrv Press",
        sets: 3,
        reps: 10,
        weight: 100
    },
    {
        name: "Sbgrsats",
        sets: 3,
        reps: 10,
        weight: 150
    },
    {
        name: "Degfdlifts",
        sets: 3,
        reps: 10,
        weight: 200
    },
    {
        name: "untbgflups",
        sets: 3,
        reps: 10,
        weight: 0
    },
    {
        name: "Purthfhups",
        sets: 3,
        reps: 10,
        weight: 0
    },
    {
        name: "Befdhdress",
        sets: 3,
        reps: 10,
        weight: 100
    },
    {
        name: "Sqzzttruats",
        sets: 3,
        reps: 10,
        weight: 150
    },
    {
        name: "Delifts",
        sets: 3,
        reps: 10,
        weight: 200
    },
    {
        name: "Pulerups",
        sets: 3,
        reps: 10,
        weight: 0
    },
    {
        name: "Puskhups",
        sets: 3,
        reps: 10,
        weight: 0
    }
]




function PersonalRecords() {

    return (

        <div id="mainDiv" className={clsx(styles.mainDiv, "max-w-[496px]  max-h-[291px] w-full flex-col m-2.5 p-5 rounded-lg ")}>
            <div className="mb-5">
                <Text variant="h4" className="max-w-[496px] text-center">Rekordok</Text>
            </div>
            <div className="max-w-[496px] max-h-[100 px] grid grid-cols-2 gap-5 ml-2">
                {
                    list.slice(0, 6).map((item) => {
                        return (
                            <div className="flex flex-row justify-between" key={item.name}>
                            <div>
                                <Text variant="body-16">{item.name} max :</Text>
                            </div>
                            <div>
                                <Text variant="body-16"><span className={styles.greenify}>{item.weight}kg</span></Text>
                            </div>
                            </div>
                        )
                    })
                }



            </div>
            <div className="flex justify-center mt-5">
                <Button color={"secondary"} rightIcon="SearchIcon" ><Text variant="button">További Rekordok   </Text> </Button>
            </div>

        </div>
    )

}

export default PersonalRecords;