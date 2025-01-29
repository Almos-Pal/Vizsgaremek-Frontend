import {Text} from "@/components/server";
import {Button} from "@/components/client";
import styles from "./GyakorlatItem.module.scss";

interface GyakorlatItemProps {
    gyakorlat: any;
}

export  const GyakorlatItem : React.FC<GyakorlatItemProps> = ({ gyakorlat }) => {
    console.log(gyakorlat);
    return (
        <div className={styles["gyakorlat-item"]}>
            <div className={styles["gyakorlat-name"]}>

            <Text variant="subtitle-16">{gyakorlat.gyakorlat_neve}</Text>
            </div>
            <div className={styles["body-image"]}></div>
            <div className={styles["gyakorlat-button"]}>
                <Button color="secondary" href={`/gyakorlat/${gyakorlat.gyakorlat_id}`}>Több infó</Button>
            </div>
        </div>
    )

}