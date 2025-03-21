import { BodySVG, Text } from "@/components/server";
import { Button } from "@/components/client";
import styles from "./GyakorlatItem.module.scss";
import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface GyakorlatItemProps {
    gyakorlat: any;
}


export const GyakorlatItem: React.FC<GyakorlatItemProps> = ({ gyakorlat }) => {
    const session = useSession();
    const isOfAdminHeritageUser = session?.data?.user?.isAdmin;;
    const isMobile = useIsMobile();

    const content = (
        <>

            <div className={styles["gyakorlat-name"]}>
                <Text variant="subtitle-16">{gyakorlat.gyakorlat_neve}</Text>
            </div>
            <BodySVG size={130} selectedMuscleIds={[gyakorlat.fo_izomcsoport]} secondaryMuscleIds={gyakorlat.izomcsoportok} />
            {!isMobile && (
                <div className="flex h-[130px] items-center justify-center">

                <div className={styles["gyakorlat-button"]}>
                    <Button color="secondary" href={`/gyakorlatok/${gyakorlat.gyakorlat_id}`}>
                        Több infó
                    </Button>
                </div>
            <div className={styles.icon}>
                {
                    isOfAdminHeritageUser
                    &&
                    <div className={styles.editButton}>
                        <Button iconOnly leftIcon={"EditIcon"} iconProps={{ size: 36, color: "var(--color-grey-100)" }} noBackground color="secondary" href={`/gyakorlatok/${gyakorlat.gyakorlat_id}/szerkeszt`}></Button>
                    </div>
                }
            </div>
                </div>
                    )}

        </>
    );

    if (isMobile) {
        return (
            <Link
                href={`/gyakorlatok/${gyakorlat.gyakorlat_id}`}
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