"use client"

import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout'
import styles from './page.module.scss'
import { EdzesTervBlock, Pagination } from '@/components/client'
import { useSession } from 'next-auth/react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import useEdzes from '@/hooks/useEdzes'


const EdzesTervekPage: React.FC = () => {


    const { data: session } = useSession();
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


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading workouts</div>;


    const workouts = Array.isArray(edzesek?.items?.[0])
        ? edzesek.items.flat()
        : edzesek?.items;

    console.log(workouts)
    return (

        <ContentLayout header="Edzéstervek">

            {workouts?.map((edzes: any) => (
                <EdzesTervBlock key={edzes.edzes_id} edzes={edzes} />
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
        </ContentLayout>

    )
}

export default EdzesTervekPage



