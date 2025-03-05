"use client"

import { StatFilter } from '@/components/client';
import { useEdzes } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Regisztralas: React.FC = () => {

    const queryParams = new URLSearchParams();
    const searchParams = useSearchParams();
  
  const router = useRouter();
  
  const { data: session } = useSession();
  let userId =0;
  if(useSession().data !== undefined){
    userId = session?.user.user_id || 0;
  }
  //  const [state, setState] = useState("front");
  
  
  const filteredValues = searchParams.get("type") || "all";
  
  
  const {data:data,} = useEdzes.getEdzesByType(userId,filteredValues);
    const handleFilterChange = (values: any) => {
      if(values){
        if (values) queryParams.set("type", values);
        const queryString = queryParams.toString();
        router.push(queryString ? `?${queryString}` : window.location.pathname);  
        
      }
    };
  
  
    console.log(data)
    
    return (
        <div>
                 <StatFilter onFilterChange={handleFilterChange}/>


        </div>
    );
};

export default Regisztralas;