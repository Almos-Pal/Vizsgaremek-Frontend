"use client"
import {  SubHeader, Pagination, RecordCard } from "@/components/client";
import { Loading } from "@/components/client/Loading/Loading";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useUserGyakorlat from "@/hooks/useUserGyakorlat";
import exp from "constants";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";


interface PageParams {
    userID: string;
  }
  
  interface RekordokPageProps {
    params: Promise<PageParams>;
  }

const RecordsPage: React.FC<RekordokPageProps> = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {data: session} = useSession();
    const userId = session?.user?.user_id;
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);


    const {data:records, isLoading} = useUserGyakorlat.getRecords(userId!);
    console.log("records", records);
        const handleFilterChange = (values: any) => {
            setPage(1); 
          };




        //   if (isLoading) return <Loading />;
          return(

        <ContentLayout 
          header="Rekordok" 
        //   filter={<GyakorlatFilter onFilterChange={handleFilterChange} />
        // }
        >
    
          <div className={"flex flex-row gap-6 mb-12 flex-wrap justify-center"}>
           {records && records.items.map((record ) => (
            <div key={record.gyakorlat.gyakorlat_id}>
              <RecordCard record={record} />

          </div>
            ))}
            
          </div>
         
          <Pagination
            value={page}
            total={records?.meta?.totalPages || 1}
            onChange={(newPage) => {
              setPage(newPage);
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", newPage.toString());
              router.push(`?${params.toString()}`);
            }}
          />
        </ContentLayout>
      );
}
export default RecordsPage;