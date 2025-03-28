import React from 'react'
import styles from './Weight.module.scss'
import { Text } from '@/components/server'

interface WeightProps {
    weight?: number
    dashboard?: boolean
}

const Weight: React.FC<WeightProps> = ({ weight, dashboard }) => {
    return (
        <div className={dashboard ? styles.dashboardContainer : styles.container}>
            {!dashboard && (
                <Text className={styles.title} variant='h4'>
                Leedzett súly
                </Text>
            )}
            <Text className={styles.value} variant={dashboard ? 'h2' : 'h1'}>
            {weight !== undefined ? `${Math.floor(weight)} kg` : 'N/A'}
            </Text>
        </div>
    )
}

export default Weight