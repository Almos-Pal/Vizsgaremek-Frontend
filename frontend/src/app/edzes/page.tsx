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

function EdzesekPage() {
    const { data: session } = useSession();
    console.log('edzes user session data: ', session?.user.isAdmin);

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const { data: edzesek, isLoading, error, refetch } = useEdzes.getEdzesek({
        page,
        limit: 3,
        user_id: session?.user.user_id
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
                initialValues={{ order: "desc" }}>
                {({ setFieldValue, values }) => {
                    useEffect(() => {
                        const queryParams = new URLSearchParams();
                        if (values.order) queryParams.set("type", values.order);
                        setFieldValue("order", values.order);
                        refetch();


                    }, [values.order]);
                    return (
                        <Form style={{ maxWidth: "750px",width:"100%", margin: "10px", justifySelf:'center' }} >
                            <FormikSelect
                                placeholder='ListaRendezés'
                                name="order"
                                options={Option}>

                            </FormikSelect>
                        </Form>
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