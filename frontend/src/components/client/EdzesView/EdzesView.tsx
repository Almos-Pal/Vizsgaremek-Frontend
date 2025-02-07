import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Edzes } from "@/types/edzes";
import Button from "../Button/Button";
import styles from "./EdzesView.module.scss";
import UnderLinedText from "../UnderLinedText/UnderLinedText";
import GyakorlatComparisonBlock from "../GyakorlatComparisonBlock/GyakorlatComparisonBlock";

interface EdzesViewProps {
    data: Edzes;
}



const EdzesView: React.FC<EdzesViewProps> = ({ data }) => {

    return <>
        <ContentLayout header={data.edzes_neve}>
            <div className={styles.edzesView}>

                <div className={styles.buttons}>



                    <Button additionalClassName={styles.singleButtonDesktop} width={420} rightIcon="PlayRightIcon">Edzés Kezdése</Button>


                    <div className={styles.doubleButtonDesktop} >
                        <Button  width={200} color="secondary" rightIcon="EditIcon">Módosítás</Button>
                        <Button  width={200} color="secondary" rightIcon="EditIcon">Törlés</Button>
                    </div>

                    <Button additionalClassName={styles.singleButtonMobile}  rightIcon="PlayRightIcon">Edzés Kezdése</Button>

                    <div className={styles.doubleButtonMobile} >
                        <Button additionalClassName={styles.btnmobileresponsive}  color="secondary" rightIcon="EditIcon">Módosítás</Button>
                        <Button additionalClassName={styles.btnmobileresponsive}  color="secondary" rightIcon="EditIcon">Törlés</Button>
                    </div>
                </div>

                <div className={styles.humanContainment}>

                </div>

                <div className={styles.underlinedText}>
                    <UnderLinedText lineLength={220} text="Gyakorlatok"></UnderLinedText>
                </div>

                {data.gyakorlatok.map((gyakorlat) => (
                    <GyakorlatComparisonBlock
                        key={gyakorlat.gyakorlat_id}
                        data={gyakorlat}
                    />
                ))}


            </div>
        </ContentLayout>
    </>
}

export default EdzesView;