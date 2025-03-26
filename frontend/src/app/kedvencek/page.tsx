"use client";

import React, {  useState } from 'react';
import useEdzes from '@/hooks/useEdzes';
import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout';
import EdzesBlock from '@/components/client/EdzesBlock/EdzesBlock';
import { useRouter, useSearchParams } from 'next/navigation';
import {  Pagination } from '@/components/client';
import { useSession } from 'next-auth/react';
import { Text } from '@/components/server';
import { Loading } from '@/components/client/Loading/Loading';

function EdzesekPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);


    const { data: edzesek, isLoading, error, } = useEdzes.getEdzesek({
        page,
        limit: 3,
        favoriteExercises: true,
        user_id: session?.user.user_id
    });

    if(isLoading) {
        return (
            <ContentLayout 
            >   
            <div className="flex justify-center items-center flex-col ">
                <Loading  hasParent/>
            </div>
            </ContentLayout>
        )
    }
    if (error) return <div>Error loading workouts</div>;



    return (

        <ContentLayout header="Kedvenc Edzések">

            {edzesek?.items?.length === 0 && <Text variant="h4"  className='text-center'>Nincs kedvenc edzésed</Text>}
            
            {
            edzesek?.items?.map((edzes: any) => (
                <EdzesBlock key={edzes.edzes_id} edzes={edzes} />
            ))}

            <Pagination
                value={page}
                total={edzesek?.meta?.totalPages || 1}
                onChange={(newPage) => {
                    setPage(newPage);
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", newPage.toString());
                    router.push(`?${params.toString()}`);
                }}
            />
        </ContentLayout >



    );
}

export default EdzesekPage;