"use client";

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useEdzes from '@/hooks/useEdzes';
import React, { use, useEffect } from 'react';
import { Text } from "@/components/server";
import { EdzesCreateEditForm } from "@/components/client/_forms";
import Stopwatch from "@/components/client/Stopwatch/Stopwatch";
import { useRouter } from "next/navigation";


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
    if (data && data.isFinalized ) {
      router.push(`/edzesek/${edzesID}`);
    }
    else if (data?.isTemplate == true) {
      router.push('/edzestervek');
    }
  }, [data, router, edzesID]);

  useEffect(() => {

    localStorage.setItem("currentEdzesID", data?.edzes_id.toString()!);
  },[data])

  if (isLoading) {
    return (
      <div>
        <Text>Loading...</Text>
      </div>
    );
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
