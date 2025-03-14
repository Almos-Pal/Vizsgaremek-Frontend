"use client";

import React, { useState } from 'react';
import styles from './EdzesBlock.module.scss';
import { BodySVG, Text } from '@/components/server';
import Button from '../Button/Button';
import Link from 'next/link';
import { useEdzes } from '@/hooks';

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
        isFavorite: boolean;
    };
}
const handleFavoriteClick = () => {
    
    useEdzes.updateEdzes();
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

const EdzesBlock: React.FC<EdzesBlockProps> = ({ edzes }) => {
    const [visibleCount, setVisibleCount] = useState(3);
    const exercisesLeft = edzes.gyakorlatok.length - visibleCount;
    const formattedDate = edzes.datum.slice(0, 10).replace(/-/g, '/');

    return (
        <div className={styles["edzes-block"]}>
            <div className={styles["edzes-header"]}>
                <Text style={{ marginLeft: '2rem' }} variant='subtitle-16'>{edzes.edzes_neve}:</Text>
                <Text style={{ marginRight: '2rem' }} variant='body-15'>{formattedDate}</Text>
                {
                edzes.isFavorite
                && 
                    <Button color='secondary' iconOnly noBackground leftIcon='FavoriteIcon' iconProps={{filled:true}} onClick={handleFavoriteClick}></Button>
                ||
                !edzes.isFavorite 
                &&
                    <Button color='secondary' iconOnly  leftIcon='FavoriteIcon' iconProps={{filled:false}} onClick={handleFavoriteClick}></Button>
                
            }
            </div>
            <div className={styles["content-wrapper"]}>
                <ul className={styles["gyakorlat-list"]}>
                    {edzes.gyakorlatok && edzes.gyakorlatok.length > 0 ? (
                        edzes.gyakorlatok.slice(0, visibleCount).map((gyakorlat) => (
                            <li key={gyakorlat.gyakorlat_id} className={styles["gyakorlat-item"]}>
                                <Text variant="body-16">{gyakorlat.gyakorlat.gyakorlat_neve}</Text>
                                <Text variant="caption">{gyakorlat.total_sets} szett</Text>
                            </li>
                        ))
                    ) : (
                        <Text variant="body-16">Nincsenek gyakorlatok</Text>
                    )}

                    {exercisesLeft > 0 && (
                        <Link
                            href={`/edzes/${edzes.edzes_id}`} className={styles["show-more-button"]}>
                            további {exercisesLeft}...
                            
                        </Link>


                    )}
                </ul>
                <div className={styles["body-image"]}>
                    <BodySVG size={200} className={styles["svg"]} selectedMuscleIds={edzesIzomcsoportok(edzes).foIzomcsoportok} secondaryMuscleIds={edzesIzomcsoportok(edzes).izomcsoportok}></BodySVG>
                </div>
            </div>

            <div className={styles["footer-button"]}>
                <Button width={'100%'} color="secondary" href={`/edzes/${edzes.edzes_id}`}>
                    Edzés megtekintése
                </Button>
            </div>

        </div>
    );
};

export default EdzesBlock;