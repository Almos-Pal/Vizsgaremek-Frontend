"use client";

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useEdzes from '@/hooks/useEdzes';
import React, { use, useEffect } from 'react';
import { Text } from "@/components/server";
import { EdzesCreateEditForm } from "@/components/client/_forms";
import Stopwatch from "@/components/client/Stopwatch/Stopwatch";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/client/Loading/Loading";


interface PageParams {
  edzesID: string;
}

interface EdzesSzerkesztPageProps {
  params: Promise<PageParams>;
}

const EdzesSzerkesztPage: React.FC<EdzesSzerkesztPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const edzesID = parseInt(resolvedParams.edzesID);
  const router = useRouter();

  const { data, isLoading, error } = useEdzes.getEdzes(edzesID);
  
  
  useEffect(() => {
    if (data && data.isFinalized) {
      router.push(`/edzesek/${edzesID}?fromFinalize=true`);
    }
    else if (data?.isTemplate == true) {
      router.push('/edzestervek');
    }
  }, [data, router, edzesID]);

  useEffect(() => {

    localStorage.setItem("currentEdzesID", data?.edzes_id.toString()!);
  },[data])

  if(isLoading) {
    return (
        <ContentLayout 
        >   
        <div className="flex justify-center items-center flex-col ">
            <Loading  hasParent/>
        </div>
        </ContentLayout>
    )
}

  if (error || !data) {
    return (
      <div>
        <Text>Hiba akadt az edzések legkérdezésénél</Text>
      </div>
    );
  }

  return (
    <ContentLayout header={data.edzes_neve} subheader={ <Stopwatch />}>
      <EdzesCreateEditForm data={data} />
    </ContentLayout>
  );
};

export default EdzesSzerkesztPage;
