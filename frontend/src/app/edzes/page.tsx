"use client";

import React, { useState } from 'react';
import useEdzes from '@/hooks/useEdzes';
import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout';
import EdzesBlock from '@/components/client/EdzesBlock/EdzesBlock';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Pagination } from '@/components/client';
import { Modal } from '@/components/client/_modal';
import { NewEdzesForm } from '@/components/client/_forms';
import { useSession } from 'next-auth/react';
import { Text } from '@/components/server';

function EdzesekPage() {
    const { data: session } = useSession();
    console.log('edzes user session data: ', session?.user.isAdmin);

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const searchParamsGyakorlatId = (searchParams.get("gyakorlat_id") || null);
    const gyakorlat_id = searchParamsGyakorlatId ? parseInt(searchParamsGyakorlatId) : null;

    const [page, setPage] = useState(initialPage);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const { data: edzesek, isLoading, error } = useEdzes.getEdzesek({
        page,
        limit: 3,
        user_id: session?.user.user_id,
        gyakorlat_id

    });


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading workouts</div>;


    const workouts = Array.isArray(edzesek?.items?.[0])
        ? edzesek.items.flat()
        : edzesek?.items;



    const handleNewEdzes = () => {
        setIsModalOpen(true)

        const currentEdzesID = localStorage.getItem("currentEdzesID");
        currentEdzesID ? localStorage.removeItem("currentEdzesID") : null;
        const storedStartTime = localStorage.getItem("edzesStartTime");
        storedStartTime ? localStorage.removeItem("edzesStartTime") : null;
    }
    let header: string = 'Edzések';
    if (edzesek?.items[0] && gyakorlat_id !== null) {
        let headerHelper = ""
        edzesek?.items[0].gyakorlatok.map((gyakorlat: any) => {
            if (gyakorlat.gyakorlat_id === gyakorlat_id) {
                headerHelper = gyakorlat.gyakorlat.gyakorlat_neve;
            }
        })
        header = "Az alábbi edzések tartalmazzák a keresett gyakorlatot: " + headerHelper;
    }


    return (


        <ContentLayout header={header} >

            {workouts?.map((edzes: any) => (
                <EdzesBlock key={edzes.edzes_id} edzes={edzes} />
            ))}
            {edzesek?.items.length === 0 && (
                <Text className='justify-self-center' >Nincs találat</Text>
            )}


            <div className='flex justify-center mt-4 pb-4'>

                <Button width={225} color='secondary' rightIcon='AddIcon' onClick={(handleNewEdzes)} >Edzés</Button>
            </div>

            <Modal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              
                showCloseButton={false}
            >

                <NewEdzesForm onSuccess={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} />

            </Modal>
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