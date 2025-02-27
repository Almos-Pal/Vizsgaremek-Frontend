import React from 'react'
import { Text } from '@/components/server'
import styles from './UnderLinedText.module.scss'

interface UnderLinedTextProps {
    text: string;
    lineLength: number;
}

const UnderLinedText: React.FC<UnderLinedTextProps> = (props) => {
  return (<>
        <Text variant='h5'>{props.text}</Text>
        <hr style={{width: props.lineLength}} className={styles.line}/>
    </>
  )
}

export default UnderLinedText