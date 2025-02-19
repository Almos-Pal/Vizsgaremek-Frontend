"use client";

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useEdzes from '@/hooks/useEdzes';
import React, { use } from 'react';
import { Text } from "@/components/server";
import { EdzesCreateEditForm } from "@/components/client/_forms";
import { Edzes } from "@/types/edzes";

interface PageParams {
  edzesID: string;
}

interface EdzesSzerkesztPageProps {
  params: Promise<PageParams>;
}

const EdzesSzerkesztPage: React.FC<EdzesSzerkesztPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const edzesID = parseInt(resolvedParams.edzesID);

  const { data, isLoading, error } = useEdzes.getEdzes(edzesID);

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
    <ContentLayout header={data.edzes_neve}>
      {/* Pass the whole edzés object as a prop */}
      <EdzesCreateEditForm data={data} />
    </ContentLayout>
  );
};

export default EdzesSzerkesztPage;
