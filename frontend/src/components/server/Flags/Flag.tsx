import { Text } from "@/components/server";
import styles from './Flag.module.scss';
import FlagValidator from "@/utils/flagValidator";
import { default as getMuscleNameById } from "@/utils/izomcsoportParse";
import clsx from "clsx";




export default function Flag({ izomcsoportok, foizomcsoport }: { izomcsoportok: number[], foizomcsoport: number }) {

    const flags = FlagValidator([...izomcsoportok, foizomcsoport]);

    return (
        <div className={styles.flagContainer}>
            {
                flags.map((flag) => {
                    return (
                        <div key={flag.value} className={clsx(styles.flag)} style={{ backgroundColor: flag.background }}>
                            <Text variant='caption' className="h-[20px]" color={flag.color}>{flag.value}</Text>
                        </div>
                    )
                })
            }
        </div>
    )
}