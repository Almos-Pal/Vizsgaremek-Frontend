"use client";

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Gyakorlat, User } from "@/types";
import styles from "./GyakorlatDataSheet.module.scss";
import { Button } from "@/components/client";
import Link from "next/link";
import { BodySVG, Text } from "@/components/server";
import getMuscleNameById from "@/utils/izomcsoportParse";
import { useSession } from "next-auth/react";
import IconButton from "../IconButton/IconButton";

import { useRouter } from "next/navigation";


interface GyakorlatDataSheetProps {
  data: Gyakorlat;
}
interface UserProps {
  userData: User;
}

// const testdata = [1,2,3,4]

const GyakorlatDataSheet: React.FC<GyakorlatDataSheetProps> = ({ data }) => {
  const { data: session } = useSession();
  const isOfAdminHeritageUser = session?.user.isAdmin;
  const router = useRouter();
  return (
    <ContentLayout header={data.gyakorlat_neve}>
      <div >
        <div className={styles.linksContainer}>
          <Button color="primary" onClick={() => router.back()} leftIcon="ArrowLeftIcon">
            vissza
          </Button>
          <Button color="secondary" href={`/rekordok`}>
            Rekordok
          </Button>
          <Button color="secondary" href={`/edzesek?gyakorlat_id=${data.gyakorlat_id}`}>
            Edzés előzmények
          </Button>
          <Button color="secondary" href={`/statisztika`}>
            diagramok
          </Button>


        </div>
        <div className={styles.linksContainerMobile}>
          <Link href={`/rekordok`}>Rekordok</Link>
          <Link href={`/edzesek?gyakorlat_id=${data.gyakorlat_id}`}>Edzés előzmények</Link>
          <Link href={`/statisztika`}>Diagrammok</Link>
        </div>
        <div className={styles.containerWIcon}>

          <Button onClick={() => router.back()}  color="secondary" width={"40px"} additionalClassName={styles["back-button-mobile"]} style={{ borderRadius: "50%", width: "30px", height: "40px", padding: "5.5px", float: "left", marginTop:"0.6rem" }} iconOnly leftIcon="ArrowLeftIcon"></Button>

          {
            isOfAdminHeritageUser
            &&
            <div className={styles.editButton}>
              <Button iconOnly leftIcon={"EditIcon"} width={36} iconProps={{ size: 36, color: "var(--color-grey-100)" }} noBackground color="primary" href={`/gyakorlatok/${data.gyakorlat_id}/szerkeszt`}></Button>
            </div>
          }

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
                <Text variant="body-16" >

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
                  <Text variant="subtitle-16" className="w-[120px]">Elsődleges izom</Text>
                  <div className={styles.primary}></div>
                </div>
                <div className={styles.svgText}>
                  <Text variant="subtitle-16" className="w-[150px]">Másodlagos izmok</Text>
                  <div className={styles.secondary}></div>
                </div>
              </div>
              <div className={styles.svg}>
                <BodySVG size={300} selectedMuscleIds={[data.fo_izomcsoport]} secondaryMuscleIds={data.izomcsoportok} />

              </div>
            </div>


          </div>


        </div>
      </div>
    </ContentLayout>
  );
};

export default GyakorlatDataSheet;
