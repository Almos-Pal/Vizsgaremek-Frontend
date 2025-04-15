"use client"

import React from 'react'
import { Navbar, ProgressChart, Stats, Weight } from '@/components/client'
import { Button } from '@/components/client'
import { MusclePieChart } from "@/components/client";


const izomcsoportCounts = {
  11: 9,
  13: 6,
  12: 4,
  10: 3,
  9: 2,
  1: 2,
  6: 2,
  2: 1,
  4: 1,
  3: 1
}


function page() {
  return (
    <>
      <MusclePieChart data={[izomcsoportCounts]} />
      <ProgressChart />

      <Stats />
      <Weight weight={100} />

    </>
  )
}

export default page