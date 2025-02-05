"use client";

import React, { useState } from 'react';
import styles from './EdzesBlock.module.scss';
import { Text } from '@/components/server';
import Button from '../Button/Button';

interface EdzesBlockProps {
    edzes: {
        edzes_neve: string;
        edzes_id: number;
        gyakorlatok: {
            gyakorlat_id: number;
            gyakorlat: {
                gyakorlat_neve: string;
            };
            total_sets: number;
        }[];
    };
}

const EdzesBlock: React.FC<EdzesBlockProps> = ({ edzes }) => {
    const [visibleCount, setVisibleCount] = useState(3);
    const exercisesLeft = edzes.gyakorlatok.length - visibleCount;

    return (
        <div className={styles["edzes-block"]}>
            <div className={styles["edzes-header"]}>
                <Text style={{ marginLeft: '2rem' }} variant='subtitle-16'>{edzes.edzes_neve}:</Text>
            </div>
            <div className={styles["content-wrapper"]}>
                <ul className={styles["gyakorlat-list"]}>
                    {edzes.gyakorlatok && edzes.gyakorlatok.length > 0 ? (
                        edzes.gyakorlatok.slice(0, visibleCount).map((gyakorlat) => (
                            <li key={gyakorlat.gyakorlat_id} className={styles["gyakorlat-item"]}>
                                <Text variant="body-16">{gyakorlat.gyakorlat.gyakorlat_neve}</Text>
                                <Text variant="caption">{gyakorlat.total_sets} sets</Text>
                            </li>
                        ))
                    ) : (
                        <li>No exercises available</li>
                    )}

                    {exercisesLeft > 0 && (
                        <a 
                        href="/edzes/" className={styles["show-more-button"]} >
                            további {exercisesLeft}... 
                        </a>

                    )}
                </ul>
                <div className={styles["body-image"]}></div>
            </div>

            <div className={styles["footer-button"]}>
                <Button    width={'100%'} color="secondary" href={`/edzes/${edzes.edzes_id}`}>
                    Edzés megtekintése
                </Button>
            </div>

        </div>
    );
};

export default EdzesBlock;