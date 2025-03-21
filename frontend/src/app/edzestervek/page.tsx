"use client"

import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout'
import styles from './page.module.scss'
import { Button, EdzesTervBlock, Pagination } from '@/components/client'
import { useSession } from 'next-auth/react'
import { Text } from '@/components/server'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import useEdzes from '@/hooks/useEdzes'
import { Modal } from '@/components/client/_modal'
import { NewEdzesForm } from '@/components/client/_forms'
import { Loading } from '@/components/client/Loading/Loading'


const EdzesTervekPage: React.FC = () => {


    const { data: session, status } = useSession();
    console.log('edzes user session data: ', session?.user.isAdmin);

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const { data: edzesek, isLoading, error } = useEdzes.getEdzesek({
        page,
        limit: 3,
        user_id: session?.user.user_id,
        isTemplate: true
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



