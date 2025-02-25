"use client"

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Edzes } from "@/types/edzes";
import Button from "../Button/Button";
import styles from "./EdzesView.module.scss";
import useEdzes from "@/hooks/useEdzes";
import { useRouter } from "next/navigation";
import { get } from "http";
import { useSession } from "next-auth/react";



export default function ProgressChart(){

    const {data:session} = useSession();
    const now = new Date();
    const past = new Date(new Date().getTime() - 240 * 60 * 60 * 1000);
    const getIntervall = useEdzes.getEdzesekIntervallum(session?.user.user_id!,now.toISOString(), past.toISOString()).data;

    const progress:Edzes[] = []
     getIntervall?.map((edzes:Edzes) => {
        progress.push(edzes)
    });




    return (
        <div>
      <ul>
        {progress.map((edzes:Edzes) => (
          <li key={edzes.edzes_id}>
            {edzes.edzes_neve}
          </li>
        ))}
      </ul>
         
        </div>
    )
}