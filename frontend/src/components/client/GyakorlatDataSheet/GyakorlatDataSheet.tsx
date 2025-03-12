"use client";

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Gyakorlat, User } from "@/types";
import styles from "./GyakorlatDataSheet.module.scss";
import {Button} from "@/components/client";
import Link from "next/link";
import { BodySVG, Text } from "@/components/server";
import getMuscleNameById from "@/utils/izomcsoportParse";


interface GyakorlatDataSheetProps {
  data: Gyakorlat; 
}
interface UserProps{
  userData: User;
}

// const testdata = [1,2,3,4]

const GyakorlatDataSheet: React.FC<GyakorlatDataSheetProps> = ({ data }) => {
  return (
  <ContentLayout header={data.gyakorlat_neve}>
    <div >
      <div className={styles.linksContainer}>
        <Button color="secondary" href={`/gyakorlat/${data.gyakorlat_id}/edit`}>
        Rekordok
        </Button>
        <Button color="secondary" href={`/gyakorlat/${data.gyakorlat_id}/edit`}>
        Edzés előzmények
        </Button>
        <Button color="secondary" href={`/gyakorlat/${data.gyakorlat_id}/edit`}>
        diagramok
        </Button>
        {}
        <Button color="secondary" href={`/gyakorlat/${data.gyakorlat_id}/szerkeszt`}>
        szerkesztés
        </Button>
      </div>
      <div className={styles.linksContainerMobile}>
      <Link href={`/gyakorlat/${data.gyakorlat_id}/records`}>Rekordok</Link>
      <Link href={`/gyakorlat/${data.gyakorlat_id}/history`}>Edzés előzmények</Link>
      <Link href={`/gyakorlat/${data.gyakorlat_id}/charts`}>Diagrammok</Link>
      <Link href={`/gyakorlat/${data.gyakorlat_id}/szerkeszt`}>szerkesztés</Link>
    </div>

      <div className={styles.dataContainer}>

        <div className={styles.content}>
          <div className={styles.info}>
            <Text variant="subtitle-16">
            Eszköz:
            </Text>
            <Text variant="body-16">{data.eszkoz}</Text>
          </div>
          <div className={styles.info}>
            <Text variant="subtitle-16">
            Elsődleges izom: 
            </Text>
            <Text variant="body-16">{getMuscleNameById(data.fo_izomcsoport)}</Text>
          </div>
          <div className={styles.info}>
            <Text variant="subtitle-16">
            Másodlagos izomok: 
            </Text>
            <Text variant="body-16">

            {data.izomcsoportok.map((izomcsoport, index) => (
              <span key={izomcsoport}>
              {getMuscleNameById(izomcsoport)}
              {data.izomcsoportok.length > 1 && index < data.izomcsoportok.length - 1 && ", "}
              </span>
            ))}
            </Text>

          </div>
          <div className={styles.description}>
            <Text variant="subtitle-16">
            Gyakorlat leírása :
            </Text>
            <Text variant="body-16">{data.gyakorlat_leiras}</Text>
          </div>
        </div>
        <div className={styles.svgContainer}>
          <div className={styles.svgHeader}>
            <div className={styles.svgText}>
              <Text variant="subtitle-16">Elsődleges izom</Text>
              <div className={styles.primary}></div>
            </div>
            <div className={styles.svgText}>
              <Text variant="subtitle-16">Másodlagos izmok</Text>
              <div className={styles.secondary}></div>
            </div>
          </div>
          <div className={styles.svg}>
          <BodySVG size={300}  selectedMuscleIds={[data.fo_izomcsoport]} secondaryMuscleIds={data.izomcsoportok}/>

          </div>
        </div>


      </div>


    </div>
  </ContentLayout>
  );
};

export default GyakorlatDataSheet;
