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
import { Form, Formik } from 'formik';
import { FormikSelect } from '@/components/client/_inputs';
import { useToast } from '@/hooks';
import clsx from 'clsx';

function EdzesekPage() {
    const { data: session } = useSession();
    console.log('edzes user session data: ', session?.user.isAdmin);
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const filter = searchParams.get("orderBy") || "desc";
    const { data: edzesek, isLoading, error, refetch } = useEdzes.getEdzesek({
        page,
        limit: 3,
        user_id: session?.user.user_id,
        orderBy: filter
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
    const Option = [
        { label: "Kedvencek alapján", value: "byFavorite" },
        { label: "Dátum alapján növekvő", value: "asc" },
        { label: "Dátum alapján csökkenő", value: "desc" },
    ]

    return (

        <ContentLayout header="Edzések">
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
                                placeholder='ListaRendezés'
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

            <div className='flex justify-center mt-4 pb-4'>
                <Button width={225} color='secondary' rightIcon='AddIcon' onClick={(handleNewEdzes)} >Edzés</Button>
            </div>

            <Modal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width={350}
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