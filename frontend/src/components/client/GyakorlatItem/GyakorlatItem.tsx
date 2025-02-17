import {BodySVG, Text} from "@/components/server";
import {Button} from "@/components/client";
import styles from "./GyakorlatItem.module.scss";
import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";

interface GyakorlatItemProps {
    gyakorlat: any;
}

export const GyakorlatItem: React.FC<GyakorlatItemProps> = ({ gyakorlat }) => {
    const isMobile = useIsMobile();

    const content = (
        <>
            <div className={styles["gyakorlat-name"]}>
                <Text variant="subtitle-16">{gyakorlat.gyakorlat_neve}</Text>
            </div>
                <BodySVG size={130}  selectedMuscleIds={[gyakorlat.fo_izomcsoport]} secondaryMuscleIds={gyakorlat.izomcsoportok}/>
            {!isMobile && (
                <div className={styles["gyakorlat-button"]}>
                    <Button color="secondary" href={`/gyakorlat/${gyakorlat.gyakorlat_id}`}>
                        Több infó
                    </Button>
                </div>
            )}
        </>
    );

    if (isMobile) {
        return (
            <Link 
                href={`/gyakorlat/${gyakorlat.gyakorlat_id}`} 
                className={styles["gyakorlat-item"]}
            >
                {content}
            </Link>
        );
    }

    return (
        <div className={styles["gyakorlat-item"]}>
            {content}
        </div>
    );
};