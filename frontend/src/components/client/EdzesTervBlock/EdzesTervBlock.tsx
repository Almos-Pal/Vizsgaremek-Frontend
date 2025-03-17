"use client"

import React, { useState } from 'react'
import { BodySVG, Text } from '@/components/server';
import Button from '../Button/Button';
import styles from './EdzesTervBlock.module.scss'
import Link from 'next/link';
import Flag from '@/components/server/Flags/Flag';
import IconButton from '../IconButton/IconButton';


interface EdzesBlockProps {
    edzes: {
        edzes_neve: string;
        edzes_id: number;
        gyakorlatok: {
            gyakorlat_id: number;
            gyakorlat: {
                gyakorlat_neve: string;
                fo_izomcsoport: number;
                izomcsoportok: {

                    izomcsoport_id: number;

                }[];
            };
            total_sets: number;
        }[];
        datum: string;
    };
}

const edzesIzomcsoportok = (edzes: EdzesBlockProps['edzes']) => {
    const foIzomcsoportok = new Set<number>();
    const izomcsoportok = new Set<number>();

    edzes.gyakorlatok.forEach(gyakorlat => {
        if (gyakorlat.gyakorlat.fo_izomcsoport) {
            foIzomcsoportok.add(gyakorlat.gyakorlat.fo_izomcsoport);
        }
        if (gyakorlat.gyakorlat.izomcsoportok) {
            gyakorlat.gyakorlat.izomcsoportok.forEach((izomcsoport) => izomcsoportok.add(izomcsoport.izomcsoport_id));
        }
    });

    return {
        foIzomcsoportok: Array.from(foIzomcsoportok),
        izomcsoportok: Array.from(izomcsoportok)
    };
};


const EdzesTervBlock: React.FC<EdzesBlockProps> = ({ edzes }) => {

    const [visibleCount, setVisibleCount] = useState(3);
    const exercisesLeft = edzes.gyakorlatok.length - visibleCount;



    return (
        <div className={styles["edzes-block"]}>
            <div className={styles["edzes-header"]}>
                <Text style={{ marginLeft: '2rem' }} variant='subtitle-16'>{edzes.edzes_neve}:</Text>
                <IconButton style={{ marginRight: '0rem' }} icon='FavoriteIcon' color='transparent' />
            </div>
            <div className={styles["content-wrapper"]}>
                <ul className={styles["gyakorlat-list"]}>
                    {edzes.gyakorlatok && edzes.gyakorlatok.length > 0 ? (
                        edzes.gyakorlatok.slice(0, visibleCount).map((gyakorlat) => (
                            <li key={gyakorlat.gyakorlat_id} className={styles["gyakorlat-item"]}>
                                <div className={styles["gyakorlat-item-content"]}>
                                    <Text variant="body-16" className={styles["gyak-title"]}>{gyakorlat.gyakorlat.gyakorlat_neve}</Text>
                                    <ul>
                                        <Flag
                                            foizomcsoport={gyakorlat.gyakorlat.fo_izomcsoport}
                                            izomcsoportok={gyakorlat.gyakorlat.izomcsoportok.map(izom => izom.izomcsoport_id)}
                                        />
                                    </ul>
                                </div>
                            </li>
                        ))
                    ) : (
                        <Text variant="body-16">Nincsenek gyakorlatok</Text>
                    )}

                    {exercisesLeft > 0 && (
                        <Link
                            href={`/edzestervek/${edzes.edzes_id}`} className={styles["show-more-button"]}>
                            további {exercisesLeft}...
                        </Link>
                    )}
                </ul>
                <div className={styles["body-image"]}>
                    <BodySVG size={275} className={styles["svg"]} selectedMuscleIds={edzesIzomcsoportok(edzes).foIzomcsoportok} secondaryMuscleIds={edzesIzomcsoportok(edzes).izomcsoportok}></BodySVG>
                </div>
            </div>

            <div className={styles["footer-button"]}>
                <Button width={'100%'} color="secondary" href={`/edzestervek/${edzes.edzes_id}`} >
                    Edzés megtekintése
                </Button>
            </div>

        </div>
    )
}

export default EdzesTervBlock