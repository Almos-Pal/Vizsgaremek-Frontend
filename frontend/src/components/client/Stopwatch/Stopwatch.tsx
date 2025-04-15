// Stopwatch.tsx
import React, { useState, useEffect } from 'react';
import { Text } from '../../server'
import styles from './Stopwatch.module.scss';

const STORAGE_KEY = 'edzesStartTime';

const Stopwatch: React.FC = () => {
    const [elapsed, setElapsed] = useState<number>(0);

    useEffect(() => {
        let startTime: number;
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            startTime = parseInt(stored, 10);
        } else {
            startTime = Date.now();
            localStorage.setItem(STORAGE_KEY, startTime.toString());
        }

        const timer = setInterval(() => {
            setElapsed(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (ms: number): string => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return <>
        <Text className={styles['stopwatch']} >
            {formatTime(elapsed)}
        </Text>
    
    </>

        
    
};

export default Stopwatch;
