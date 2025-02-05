"use client"

import React, { use } from 'react'
import { Text } from '@/components/server'
import useEdzes from '@/hooks/useEdzes'
import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout';

interface PageParams {
  edzesID: string;
}

interface EdzesViewPageProps {
  params: Promise<PageParams>;
}

const EdzesViewPage: React.FC<EdzesViewPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const edzesID = parseInt(resolvedParams.edzesID);

  const { data, isLoading, error } = useEdzes.getEdzes(edzesID);

  if (isNaN(edzesID)) {
    return (
      <div>
        <Text>Helytelen edzesID</Text>
      </div>
    );
  }

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
        <Text>Error fetching edzes data. Please try again later.</Text>
      </div>
    )
  }
  return (<>

      
    </>
  )
}

export default EdzesViewPage