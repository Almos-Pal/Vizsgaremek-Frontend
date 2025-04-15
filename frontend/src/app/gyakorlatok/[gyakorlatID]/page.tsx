"use client";

import { GyakorlatDataSheet } from "@/components/client";
import useGyakorlat from "@/hooks/useGyakorlat";
import { Text } from "@/components/server";
import { use } from "react";
import { Loading } from "@/components/client/Loading/Loading";
import ErrorPage from "@/components/client/ErrorPage/Error";

interface PageParams {
  gyakorlatID: string;
}

interface GyakorlatDataSheetPageProps {
  params: Promise<PageParams>;
}

const GyakorlatDataSheetPage: React.FC<GyakorlatDataSheetPageProps> = ({
  params,
}) => {
  const resolvedParams = use(params);
  const gyakorlatID = parseInt(resolvedParams.gyakorlatID);

  if (isNaN(gyakorlatID)) {
    return <ErrorPage />;
  }

  const { data, isLoading, error } = useGyakorlat.getGyakorlat(gyakorlatID);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return <div>{data ? <GyakorlatDataSheet data={data} /> : <ErrorPage />}</div>;
};

export default GyakorlatDataSheetPage;
