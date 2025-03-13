
"use client"

import React, { useState } from 'react'
import styles from './SmallGyakorlatView.module.scss'
import { useEdzes } from '@/hooks';
import { useFormikContext } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import IconButton from '../IconButton/IconButton';
import { Text } from '@/components/server'
import { ConfirmationModal } from '../_modal';
import { Gyakorlat } from '@/types';






interface SmallGyakorlatViewProps {
    index: number;
    gyakorlat: {
        gyakorlat_id: number;
        gyakorlat_neve: string;
        gyakorlat_leiras: string;
        fo_izomcsoport: number;
        izomcsoportok: number[];
    }
    arrayHelpers: {
        remove: (index: number) => void;
    };
}



const SmallGyakorlatView: React.FC<SmallGyakorlatViewProps> = ({ index, gyakorlat, arrayHelpers }) => {

    const { mutate: deleteGyakorlatFromEdzes } = useEdzes.deleteGyakorlatFromEdzes();
    const [isGyakorlatConfirmModalOpen, setIsGyakorlatConfirmModalOpen] = useState(false);
    const { values } = useFormikContext<any>();
    const { data: session } = useSession();

    const handleOpenDeleteConfirm = () => {
        setIsGyakorlatConfirmModalOpen(true);
    };

    const handleDeleteGyakorlatCancel = () => {
        setIsGyakorlatConfirmModalOpen(false);
    };

    const handleDeleteGyakorlatConfirm = () => {
        setIsGyakorlatConfirmModalOpen(false);
        if (!values.edzes_id || !gyakorlat.gyakorlat_id) {
            console.error("Missing required IDs");
            return;
        }

        deleteGyakorlatFromEdzes(
            {
                edzesId: values.edzes_id,
                gyakorlatId: gyakorlat.gyakorlat_id,
                userId: session?.user.user_id!, // perfection
            },
            {
                onSuccess: () => {
                    console.log(`Gyakorlat ${gyakorlat.gyakorlat_id} deleted successfully.`);
                    arrayHelpers.remove(index);
                },
                onError: (error) => {
                    console.error("Error deleting gyakorlat:", error);
                },
            }
        );
    };


    console.log("gyakorlatos:", gyakorlat)

    return (
        <div className={styles["edzes-block"]}>

            <div className={styles["edzes-header"]}>
                <Link className={styles["gyak-neve"]} href={`/gyakorlat/${gyakorlat.gyakorlat_id}`}>
                    <Text variant='subtitle-16'  >

                        {gyakorlat.gyakorlat_neve}:
                    </Text>
                </Link>

                <IconButton
                    color="secondary"
                    icon="CancelIcon"
                    type="button"
                    onClick={handleOpenDeleteConfirm}
                />
            </div>


            <Text>

                {gyakorlat.gyakorlat_leiras}

            </Text>


            <Text>Főfasz: {gyakorlat.fo_izomcsoport}</Text>

            {isGyakorlatConfirmModalOpen && (
                <ConfirmationModal
                    visible={isGyakorlatConfirmModalOpen}
                    title="Biztos, hogy törölni akarja ezt a gyakorlatot?"
                    onConfirm={handleDeleteGyakorlatConfirm}
                    onCancel={handleDeleteGyakorlatCancel}
                    confirmText="Igen"
                    cancelText="Nem"
                />
            )}

        </div>
    )
}

export default SmallGyakorlatView