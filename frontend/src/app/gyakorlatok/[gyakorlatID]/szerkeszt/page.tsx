"use client";

import useGyakorlat from "@/hooks/useGyakorlat";
import { Text } from "@/components/server";
import { use } from "react";
import { GyakorlatCreate } from "@/types";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { GyakorlatCreateEditForm } from "@/components/client/_forms";
import { Loading } from "@/components/client/Loading/Loading";

interface PageParams {
  gyakorlatID: string;
}

interface GyakorlatSzerkesztPageProps {
  params: Promise<PageParams>;
}

const GyakorlatSzerkesztPage: React.FC<GyakorlatSzerkesztPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const gyakorlatID = parseInt(resolvedParams.gyakorlatID);
  const isNew = resolvedParams.gyakorlatID === "uj";


  const { data, isLoading, error } = !isNew ? useGyakorlat.getGyakorlat(gyakorlatID) : { data: null, isLoading: false, error: null };


  const initialValues:GyakorlatCreate = {
    fo_izomcsoport: data?.fo_izomcsoport || 0,
    izomcsoportok: data?.izomcsoportok || [],
    gyakorlat_neve: data?.gyakorlat_neve || "",
    gyakorlat_leiras: data?.gyakorlat_leiras || "",
    eszkoz:  data?.eszkoz || ""
    
}



  if (!isNew &&  isLoading) {
    return (
      <Loading />
    );
  }

  if (!isNew && error) {
    return (
      <div>
        <Text>Error fetching gyakorlat data. Please try again later.</Text>
      </div>
    );
  }

  return (
    <div>
      <ContentLayout header={isNew? "Új gyakorlat létrehozása": "gyakorlat Szerkesztése"}>
        <GyakorlatCreateEditForm initialData={initialValues} id={data?.gyakorlat_id}/>
        </ContentLayout>
    </div>
  );
};

export default GyakorlatSzerkesztPage;
