import React from 'react'
import styles from './Weight.module.scss'
import { Text } from '@/components/server'

interface WeightProps {
    weight: number
}

const Weight: React.FC<WeightProps> = ({ weight }) => {
    return (
        <div className={styles.container}>
            <Text className={styles.title}  variant='h4'>
            Összesített súly leedzve
            </Text>
            <Text className={styles.value} variant='h1'>
                {weight} kg
            </Text>
        </div>
    )
}

export default Weight