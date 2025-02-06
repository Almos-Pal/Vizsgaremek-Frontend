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
            <div>
                <Button width={420} rightIcon="PlayRightIcon">Edzés Kezdése</Button>
                <Button color="secondary" rightIcon="EditIcon">Módosítás</Button>
                <Button color="secondary" rightIcon="EditIcon">Törlés</Button>

                <div className={styles.humanContainment}>

                </div>

                <UnderLinedText lineLength={220} text="Gyakorlatok" ></UnderLinedText>

                {data.gyakrolatok.map((gyakorlat) => (
                    <GyakorlatComparisonBlock
                        key={gyakorlat.gyakorlat_id}
                        data={gyakorlat}
                    />
                ))}
                <UnderLinedText lineLength={220} text="Gyakorlatok Összehasonlítása" ></UnderLinedText>


            </div>
        </ContentLayout>
    </>
}

export default EdzesView;