"use client"

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useEdzes from '@/hooks/useEdzes';
import React, { use } from 'react'
import { Text } from "@/components/server";
import { EdzesCreateEditForm } from "@/components/client/_forms";
import { EdzesCreate } from "@/types/edzes";

interface PageParams {
    edzesID: string;
}

interface EdzesSzerkesztPageProps {
    params: Promise<PageParams>;
}


const EdzesSzerkesztPage: React.FC<EdzesSzerkesztPageProps> = ({ params }) => {
    const resolvedParams = use(params);
    const edzesID = parseInt(resolvedParams.edzesID);
    const isNew = resolvedParams.edzesID === "uj";

    const { data, isLoading, error } = !isNew ? useEdzes.getEdzes(edzesID) : { data: null, isLoading: false, error: null };


    let initialValues: EdzesCreate = {
        edzes_neve: data?.edzes_neve || "",
        datum: data?.datum || new Date(),
        ido: data?.ido || 0,
        user_id: data?.user_id || 0
    };

    if (!isNew &&  isLoading) {
        return (
          <div>
            <Text>Loading...</Text>
          </div>
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
        <ContentLayout header={isNew? "Új edzés létrehozása": "Edzés Szerkesztése"}>
            {/* <EdzesCreateEditForm initialData={initialValues} id={data?.edzes_id}/> */}
            <EdzesCreateEditForm initialData={initialValues} id={data?.edzes_id} gyakorlatok={data?.gyakorlatok}>

            </EdzesCreateEditForm>

        </ContentLayout>
    )
    
}


export default EdzesSzerkesztPage