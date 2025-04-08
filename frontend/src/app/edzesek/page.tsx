"use client";

import React, { useEffect, useState } from 'react';
import useEdzes from '@/hooks/useEdzes';
import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout';
import EdzesBlock from '@/components/client/EdzesBlock/EdzesBlock';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Pagination } from '@/components/client';
import { Modal } from '@/components/client/_modal';
import { NewEdzesForm } from '@/components/client/_forms';
import { useSession } from 'next-auth/react';
import { EdzesOnSameDay } from '@/utils';
import { Text } from '@/components/server';
import { Loading } from '@/components/client/Loading/Loading';
import { Form, Formik } from 'formik';
import { FormikSelect } from '@/components/client/_inputs';
import { useToast } from '@/hooks';

function EdzesekPage() {
    const { data: session, status } = useSession();
    console.log('edzes user session data: ', session?.user.isAdmin);

    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const searchParamsGyakorlatId = (searchParams.get("gyakorlat_id") || null);
    const gyakorlat_id = searchParamsGyakorlatId ? parseInt(searchParamsGyakorlatId) : null;

    const [page, setPage] = useState(initialPage);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const filter = searchParams.get("orderBy") || "desc";    
    const { data: edzesek, isLoading, error, refetch } = useEdzes.getEdzesek({
        page,
        limit: 3,
        user_id: session?.user.user_id,
        orderBy: filter,
        gyakorlat_id
        
    });
    const { data: validationEdzesek } = useEdzes.getEdzesek({
        limit: 1000,
        user_id: session?.user.user_id
    });
    
    
    
    if (error) return <div>Error loading workouts</div>;
    
    
    const workouts = Array.isArray(edzesek?.items?.[0])
    ? edzesek.items.flat()
    : edzesek?.items;
    
    if (status === "loading") {
        return <Loading />;
    }


    const handleNewEdzes = () => {

        setIsModalOpen(true)

        const currentEdzesID = localStorage.getItem("currentEdzesID");
        currentEdzesID ? localStorage.removeItem("currentEdzesID") : null;
        const storedStartTime = localStorage.getItem("edzesStartTime");
        storedStartTime ? localStorage.removeItem("edzesStartTime") : null;
    }
    const Option = [
        { label: "Kedvencek alapján", value: "byFavorite" },
        { label: "Dátum alapján növekvő", value: "asc" },
        { label: "Dátum alapján csökkenő", value: "desc" },
    ]
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

            <Formik
                
                onSubmit={() => { }}
                initialValues={{ order: filter }}>
                {({ setFieldValue, values }) => {
                    useEffect(() => {
                        if (values.order !== filter) {
                            const params = new URLSearchParams(searchParams.toString());        
                            params.set("orderBy", values.order);
                            setPage(1);
                            router.push(`?${params.toString()}`);
                            setFieldValue("order", values.order);
                            toast.info('Visszakerültél az első oldalra');
                        } 


                    }, [values.order]);
                    return (
                        <div className='max-w-[750px] flex  w-full justify-self-center'>
                        <Form style={{ maxWidth: "750px",width:"100%", margin: "10px",paddingBottom:"25px", justifySelf:'center' }} >
                            <FormikSelect
                                placeholder='Listarendezés'
                                name="order"
                                options={Option}>
                                

                            </FormikSelect>
                        </Form>
                        </div>
                    )
                }}
            </Formik>

            {workouts?.map((edzes: any) => (
                <EdzesBlock key={edzes.edzes_id} edzes={edzes} />
            ))}
            {edzesek?.items.length === 0 && (
                <Text variant='subtitle-15' className='justify-self-center mb-6' >Jelenleg még nincsenek kész edzései</Text>
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