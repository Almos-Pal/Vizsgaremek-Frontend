"use client"

import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { Edzes } from "@/types/edzes";
import Button from "../Button/Button";
import styles from "./EdzesView.module.scss";
import useEdzes from "@/hooks/useEdzes";
import { useRouter } from "next/navigation";


export default function ProgressChart(){

    interface EdzesBlockProps {
        edzes: {
            edzes_neve: string;
            edzes_id: number;
            gyakorlatok: {
                gyakorlat_id: number;
                gyakorlat: {
                    gyakorlat_neve: string;
                };
                total_sets: number;
            }[];
            datum: string;
        };
    }



    let asd:EdzesBlockProps[] = []
    fetch('http://localhost:8000/edzes/intervallum?user_id=1&startDate=1111-11-11&endDate=2025-11-11').then(response => response.json()).then(data => console.log(data))

    return (
        <div>
            
        </div>
    )
}