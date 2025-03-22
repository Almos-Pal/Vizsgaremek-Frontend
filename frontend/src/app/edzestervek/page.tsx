"use client"

import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout'
import styles from './page.module.scss'
import { Button, EdzesTervBlock, Pagination } from '@/components/client'
import { useSession } from 'next-auth/react'
import { Text } from '@/components/server'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Modal } from '@/components/client/_modal'
import { NewEdzesForm } from '@/components/client/_forms'
import { Form, Formik } from 'formik'
import { useEdzes, useToast } from '@/hooks';
import { FormikSelect } from '@/components/client/_inputs'
import { Loading } from '@/components/client/Loading/Loading'


const EdzesTervekPage: React.FC = () => {


    const { data: session, status } = useSession();
    console.log('edzes user session data: ', session?.user.isAdmin);


    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const filter = searchParams.get("orderBy") || "desc";
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const { data: edzesek, isLoading, error } = useEdzes.getEdzesek({
        page,
        limit: 3,
        user_id: session?.user.user_id,
        orderBy: filter,
        isTemplate: true
    });

    const Option = [
        { label: "Kedvencek alapján", value: "byFavorite" },
        { label: "Dátum alapján növekvő", value: "asc" },
        { label: "Dátum alapján csökkenő", value: "desc" },
    ]

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading workouts</div>;


    const workouts = Array.isArray(edzesek?.items?.[0])
        ? edzesek.items.flat()
        : edzesek?.items;

    const handleNewEdzes = () => {
        setIsModalOpen(true)
    }



    if (status === "loading") {
        return <Loading />;
    }



    return (

        <ContentLayout header="Edzéstervek">


            
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
                <EdzesTervBlock key={edzes.edzes_id} edzes={edzes} />
            ))}
            {edzesek?.items.length === 0 && (
                <Text variant='subtitle-15' className='justify-self-center mb-6' >Jelenleg még nincsenek edzétervei</Text>
            )}
            <div className='flex justify-center mt-4 pb-4'>
                <Button width={225} color='secondary' rightIcon='AddIcon' onClick={(handleNewEdzes)} >Edzésterv</Button>
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



            <Modal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}

                showCloseButton={false}
            >

                <NewEdzesForm template onSuccess={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} />

            </Modal>
        </ContentLayout>

    )
}

export default EdzesTervekPage



