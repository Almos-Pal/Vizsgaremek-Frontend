"use client"

import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout'
import React, { use, useEffect } from 'react'
import { Text } from '@/components/server'
import { useEdzes } from '@/hooks';

import { useRouter } from "next/navigation";


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


    useEffect(() => {
        if (data?.isTemplate == false) {
            router.push('/dashboard');
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
                <Text>Hiba akadt az edzések legkérdezésénél</Text>
            </div>
        );
    }


    return (<ContentLayout header="Edzés szerkesztése" subheader={data.edzes_neve}>
        <div>

        </div>

    </ContentLayout>
    )


}

export default EdzesTervSzerkesztő
