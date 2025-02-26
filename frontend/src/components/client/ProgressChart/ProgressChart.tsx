"use client"

import useEdzes from "@/hooks/useEdzes";
import { useSession } from "next-auth/react";

import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Text} from "@/components/server";
import dateParse from "@/utils/dateParse";




export default function ProgressChart(){
  interface chartDataProps{
    id: number;
    date: string;
    weight: number;
  }
  const {data:session} = useSession();
  console.log(session?.user.user_id)
  
  const { data:tenDayData, isLoading:isLoadingUser,error } = useEdzes.getTenDayEdzesek(session?.user.user_id!, 4); 
  
  
  let items:chartDataProps[] = []
  
  
  tenDayData && tenDayData.map((edzes) => {
    let help:number = 0
    edzes.gyakorlatok.map((gyakorlat) => {
      if(gyakorlat.gyakorlat.gyakorlat_neve === "Ab Roller"){
        gyakorlat.szettek.map((set) => {
      if(set.weight>help){
        help = set.weight
      }
      
    })
    items.push({id:edzes.edzes_id, date: dateParse(new Date(edzes.datum)), weight : help}) 
  }
  
})
})

items.map((item) => {
  console.log( )
})

if(isLoadingUser) {
  return <Text>Loading...</Text>
}
    if (error && (error as any).status === 404) {
      return (
        <div>
            <Text>User not found</Text>
          </div>
        );
      }
        return (  
          <ResponsiveContainer width={"100%"} height={300}>
      <BarChart
        width={1100}
        height={400}
        data={items}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        >
       
        <XAxis dataKey="date" stroke="var(--color-light)" />
        <YAxis stroke="var(--color-light)" />
        <Tooltip cursor={{fill: 'none'}} />

        <Bar radius={[5,5,0,0]} dataKey="weight" barSize={60} fill="var(--color-primary-50)"  activeBar={<Rectangle fill="var(--color-primary-10)"  /> } />
      </BarChart>
      </ResponsiveContainer>
)
}
    