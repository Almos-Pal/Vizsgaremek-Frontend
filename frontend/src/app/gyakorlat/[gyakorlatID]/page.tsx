"use client";

import { GyakorlatDataSheet } from "@/components/client"; 
import useGyakorlat from "@/hooks/useGyakorlat";
import { Text } from "@/components/server";
import { use } from "react";

interface PageParams {
  gyakorlatID: string;
}

interface GyakorlatDataSheetPageProps {
  params: Promise<PageParams>;
}

const GyakorlatDataSheetPage: React.FC<GyakorlatDataSheetPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const gyakorlatID = parseInt(resolvedParams.gyakorlatID);

  if (isNaN(gyakorlatID)) {
    return (
      <div>
        <Text>Invalid gyakorlatID</Text>
      </div>
    );
  }

  const { data, isLoading, error } = useGyakorlat.getGyakorlat(gyakorlatID);

  if (isLoading) {
    return (
      <div>
        <Text>Loading...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Text>Error fetching gyakorlat data. Please try again later.</Text>
      </div>
    );
  }

  return (
    <div>
      {data ? <GyakorlatDataSheet data={data} /> : <Text>No data available</Text>}
    </div>
  );
};

export default GyakorlatDataSheetPage;
