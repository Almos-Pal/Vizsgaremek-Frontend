"use client"

import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout'
import React, { use, useEffect } from 'react'
import { Text } from '@/components/server'
import { useEdzes, useToast } from '@/hooks';

import { useRouter } from "next/navigation";
import { EdzesTervEditForm } from '@/components/client'


interface PageParams {
    edzesID: string;
}

interface EdzesTervSzerkesztPageProps {
    params: Promise<PageParams>;
}


const EdzesTervSzerkesztő: React.FC<EdzesTervSzerkesztPageProps> = ({ params }) => {
    const resolvedParams = use(params);
    const edzesID = parseInt(resolvedParams.edzesID);

    const router = useRouter();
    const { data, isLoading, error } = useEdzes.getEdzes(edzesID);
    const toast = useToast();

    useEffect(() => {
        if ((error as any)?.status === 401) {
            toast.error("Nincs jogosultság a megtekintéshez. Átirányítás a főoldalra..");
            setTimeout(() => {
                router.push("/dashboard");
              }, 1500);
        }
        if (data?.isTemplate == false) {
            router.push('/dashboard');
        }
    }, [error,data, router, edzesID]);


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



    return (<ContentLayout header="Edzésterv szerkesztése" subheader={data.edzes_neve}>
        <EdzesTervEditForm data={data} />

    </ContentLayout>
    )


}

export default EdzesTervSzerkesztő
