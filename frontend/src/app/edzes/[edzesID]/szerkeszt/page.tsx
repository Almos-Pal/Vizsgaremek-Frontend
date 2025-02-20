"use client";

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useEdzes from '@/hooks/useEdzes';
import React, { use, useEffect } from 'react';
import { Text } from "@/components/server";
import { EdzesCreateEditForm } from "@/components/client/_forms";
import { Edzes } from "@/types/edzes";
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
  
  // Once data is loaded, check if the edzés is finalized.
  useEffect(() => {
    if (data && data.isFinalized) {
      // Redirect the user back to the edzés view page.
      router.push(`/edzes/${edzesID}`);
    }
  }, [data, router, edzesID]);


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
        <Text>Error fetching edzés data. Please try again later.</Text>
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
