"use client";

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useEdzes from '@/hooks/useEdzes';
import React, { use, useEffect } from 'react';
import { Text } from "@/components/server";
import { EdzesCreateEditForm } from "@/components/client/_forms";
import Stopwatch from "@/components/client/Stopwatch/Stopwatch";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/client/Loading/Loading";
import { useToast } from "@/hooks";
import Image from "next/image";
import { Error } from "@/components/client";

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
  const toast = useToast();

  const { data, isLoading, error } = useEdzes.getEdzes(edzesID);

  const isLoadingData = isLoading || !data;

  function isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  const isDateToday = data ? isToday(new Date(data.datum)) : true;


  useEffect(() => {
    if (!isLoadingData && !isDateToday) {
      toast.error("Ez az edzés nem szerkeszthető a mai napon");
      const timeout = setTimeout(() => {
        router.back();
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [isDateToday, isLoadingData, router]);


  useEffect(() => {
    if (data?.isFinalized) {
      router.push(`/edzesek/${edzesID}?fromFinalize=true`);
    } else if (data?.isTemplate === true) {
      router.push('/edzestervek');
    }
  }, [data, router, edzesID]);


  useEffect(() => {
    if (data && isDateToday) {
      localStorage.setItem("currentEdzesID", data.edzes_id.toString());
    }
  }, [data]);

  // Show loading spinner
  if (isLoadingData) {
    return (
      <ContentLayout>
        <div className="flex justify-center items-center flex-col">
          <Loading hasParent />
        </div>
      </ContentLayout>
    );
  }


  
  
  if (error || !data) {
    return (
      <div>
        <Text>Hiba akadt az edzések lekérdezésénél</Text>
      </div>
    );
  }
  
  if (!isDateToday) {
    return <Error />;
  }
  
  return (
    <ContentLayout
      header={data.edzes_neve}
      subheader={isDateToday ? <Stopwatch /> : null}
    >
      <EdzesCreateEditForm data={data} />
    </ContentLayout>
  );

};

export default EdzesSzerkesztPage;
