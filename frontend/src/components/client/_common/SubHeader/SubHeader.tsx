import {Text} from "@/components/server";
import styles from "./SubHeader.module.scss";


interface SubHeaderProps {
    header: string;
}
 const SubHeader: React.FC<SubHeaderProps> = ({ header }) => {
return (     <div className={styles["sub-header"]}>

    <Text variant="h5">{header}</Text>
    <div className={styles["line"]}>

    </div>
    </div>)
}
export default SubHeader;