"use client"

import useEdzes from '@/hooks/useEdzes';
import React, { use } from 'react'

interface PageParams {
    edzesID: string;
}

interface EdzesSzerkesztPageProps {
    params: Promise<PageParams>;
}


const EdzesSzerkesztPage: React.FC<EdzesSzerkesztPageProps> = ({ params }) => {
    const resolvedParams = use(params);
    const edzesID = parseInt(resolvedParams.edzesID);
    const isNew = resolvedParams.edzesID === "uj";

    const { data, isLoading, error } = !isNew ? useEdzes.getEdzes(edzesID) : { data: null, isLoading: false, error: null };


    let initialValues: 

    return (
        <div>page</div>
    )
    
}


export default EdzesSzerkesztPage