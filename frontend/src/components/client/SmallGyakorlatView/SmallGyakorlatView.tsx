
"use client"

import React, { useState } from 'react'
import styles from './SmallGyakorlatView.module.scss'
import { useEdzes } from '@/hooks';
import { useFormikContext } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import IconButton from '../IconButton/IconButton';
import { BodySVG, Text } from '@/components/server'
import { ConfirmationModal } from '../_modal';
import { Gyakorlat } from '@/types';
import Button from '../Button/Button';
import { toast } from 'react-toastify';


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

const edzesIzomcsoportok = (gyakorlat: {
    gyakorlat_id: number;
    gyakorlat_neve: string;
    gyakorlat_leiras: string;
    fo_izomcsoport: number;
    izomcsoportok: number[];
}) => {
    const foIzomcsoportok = new Set<number>();
    const izomcsoportok = new Set<number>();

    if (gyakorlat.fo_izomcsoport) {
        foIzomcsoportok.add(gyakorlat.fo_izomcsoport);
    }
    if (gyakorlat.izomcsoportok) {
        gyakorlat.izomcsoportok.forEach((id) => izomcsoportok.add(id));
    }

    return {
        foIzomcsoportok: Array.from(foIzomcsoportok),
        izomcsoportok: Array.from(izomcsoportok),
    };
};


const SmallGyakorlatView: React.FC<SmallGyakorlatViewProps> = ({ index, gyakorlat, arrayHelpers }) => {


    const [expanded, setExpanded] = useState(false);
    const textLimit = 300;
    const isLongText = gyakorlat.gyakorlat_leiras.length > textLimit;
    const displayedText = expanded
        ? gyakorlat.gyakorlat_leiras
        : gyakorlat.gyakorlat_leiras.slice(0, textLimit) + (isLongText ? "..." : "");



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
                    toast.success("Gyakorlat törölve");
                    arrayHelpers.remove(index);
                },
                onError: (error) => {
                    toast.error("Hiba történt a gyakorlat törlése közben");
                    console.error("Error deleting gyakorlat:", error);
                },
            }
        );
    };


    return (
        <div className={styles["edzes-block"]}>

            <div className={styles["edzes-header"]}>
                <Link className={styles["gyak-neve"]} href={`/gyakorlatok/${gyakorlat.gyakorlat_id}`}>
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


            <div className={styles["data-pair"]}>
                <div className={styles["gyakorlat-leiras"]}>
                    <div className={styles["svg-container"]}>
                        <BodySVG size={200} className={styles["svg-mobile"]} selectedMuscleIds={edzesIzomcsoportok(gyakorlat).foIzomcsoportok} secondaryMuscleIds={edzesIzomcsoportok(gyakorlat).izomcsoportok}></BodySVG>
                    </div>
                    <Text style={{ textAlign: 'justify' }}>
                        {displayedText}
                    </Text>
                    {isLongText && (
                        <div className={styles["see-more-button-container"]}>
                            <button type="button" onClick={() => setExpanded(!expanded)} className={styles["see-more-button"]}>
                                {expanded ? "Kevesebb" : "Több"}
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <BodySVG size={150} className={styles["svg"]} selectedMuscleIds={edzesIzomcsoportok(gyakorlat).foIzomcsoportok} secondaryMuscleIds={edzesIzomcsoportok(gyakorlat).izomcsoportok}></BodySVG>
                </div>
            </div>




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