"use client"

import React from 'react'
import { Navbar } from '@/components/client'
import { Button } from '@/components/client'
import { MusclePieChart } from "@/components/client";


const izomcsoportCounts = {
  "Hasizom": 9,
  "Combfeszítő izom": 6,
  "Combhajlító izom": 4,
  "Vádli izom": 3,
  "Alsó hátizom": 2,
  "Combközelítő izom": 2,
  "Combtávolító izom": 2,
  "Középső hátizom": 1,
  "Alkar izom": 1,
  "Csuklyás izom": 1
}


function page() {
  return (
    <>
      <MusclePieChart data={[izomcsoportCounts]} />
    </>
  )
}

export default page