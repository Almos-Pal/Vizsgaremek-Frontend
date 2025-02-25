"use client"

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Edzes } from "@/types/edzes";
import Button from "../Button/Button";
import styles from "./EdzesView.module.scss";
import useEdzes from "@/hooks/useEdzes";
import { useRouter } from "next/navigation";
import { get } from "http";
import { useSession } from "next-auth/react";
import { isObject } from "formik";
import { gyakorlatApi } from "@/lib/api";
import dateParse from "@/utils/dateParse";



export default function ProgressChart(){
  interface chartDataProps{
    id: number;
    date: Date;
    weight: number;
  }
  const {data:session} = useSession();
  console.log(session?.user.user_id)

  const { data = [] } = useEdzes.getTenDayEdzesek(session?.user.user_id!, "Ab Roller"); 

const getTenDay = data ?? [];

let items:chartDataProps[] = []


getTenDay.map((edzes) => {
  let help:number = 0
edzes.gyakorlatok.map((gyakorlat) => {
//  console.log(gyakorlat.gyakorlat.gyakorlat_neve)
  if(gyakorlat.gyakorlat.gyakorlat_neve === "Ab Roller"){
    gyakorlat.szettek.map((set) => {
      if(set.weight>help){
        help = set.weight
      }
      
    })

    items.push({id:edzes.edzes_id, date: edzes.datum, weight : help})
   }

  })
})

items.map((item) => {
  console.log( )
})


    return (
        <div>
      <ul>
    {items.map((item) => (
      <li key={item.id}>{item.weight} {new Date(item.date).toISOString().split('T')[0]}</li>
        )
      )
    }

      </ul>
         
        </div>
    )
}