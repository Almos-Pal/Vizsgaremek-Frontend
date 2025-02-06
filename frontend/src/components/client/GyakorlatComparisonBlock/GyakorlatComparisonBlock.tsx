import { Gyakorlat } from '@/types'
import React from 'react'
import { Text } from '@/components/server'

interface GyakorlatComparisonBlockProps {
    data: Gyakorlat;
}

const GyakorlatComparisonBlock: React.FC<GyakorlatComparisonBlockProps> = ({ data }) => {
  return (
    <div>
      <Text>{data.gyakorlat_neve}</Text>
    </div>
  )
}

export default GyakorlatComparisonBlock