"use client";

import React, { useState } from 'react';
import useEdzes from '@/hooks/useEdzes';
import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout';
import EdzesBlock from '@/components/client/EdzesBlock/EdzesBlock';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Pagination } from '@/components/client';

function EdzesekPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);

    // Fetch workouts with the provided page and limit parameters
    const { data: edzesek, isLoading, error } = useEdzes.getEdzesek({
        page,
        limit: 3,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading workouts</div>;

    // Log the fetched data for debugging
    console.log('Fetched edzesek:', edzesek);

    // If items is a nested array, flatten it.
    const workouts = Array.isArray(edzesek?.items?.[0])
        ? edzesek.items.flat()
        : edzesek?.items;

    return (
        <ContentLayout header="Edzések">
            {workouts?.map((edzes: any) => (
                <EdzesBlock key={edzes.edzes_id} edzes={edzes} />
            ))}

            <div className='flex justify-center mt-4 pb-4'>
                <Button width={225} color='secondary' rightIcon='AddIcon'>Edzés</Button>
            </div>

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


        </ContentLayout>



    );
}

export default EdzesekPage;