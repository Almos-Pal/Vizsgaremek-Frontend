"use client";

import React, { use, useEffect } from "react";
import { Text } from "@/components/server";
import useEdzes from "@/hooks/useEdzes";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { EdzesView } from "@/components/client";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/client/Loading/Loading";
import { useToast } from "@/hooks";
import ErrorPage from "@/components/client/ErrorPage/Error";

interface PageParams {
  edzesID: string;
}

interface EdzesViewPageProps {
  params: Promise<PageParams>;
}

const EdzesViewPage: React.FC<EdzesViewPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const edzesID = parseInt(resolvedParams.edzesID);
  const router = useRouter();
  const { data, isLoading, error } = useEdzes.getEdzes(edzesID);
  const toast = useToast();

  useEffect(() => {
    if ((error as any)?.status === 401) {
      toast.error(
        "Nincs jogosultság a megtekintéshez. Átirányítás a főoldalra.."
      );
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
    if (data?.isTemplate === true) {
      router.push("/edzestervek");
    }
  }, [error, data, router, edzesID]);

  if (isNaN(edzesID)) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <ContentLayout>
        <div className="flex justify-center items-center flex-col ">
          <Loading hasParent />
        </div>
      </ContentLayout>
    );
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!data) {
    return <ErrorPage />;
  }

  return (
    <>
      <EdzesView data={data}></EdzesView>
    </>
  );
};

export default EdzesViewPage;
