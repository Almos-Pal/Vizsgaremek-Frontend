import userGyakorlatAPI from "@/lib/api/userGyakorlatAPI";
import { useQuery } from "@tanstack/react-query";

interface GetRecordsParams {
    page?: number;
    limit?: number;
    isRecord?:  boolean;

  }


const useUserGyakorlat = {
    getRecords: (id: number ) => {
        return useQuery({
            queryKey: ['userGyakorlat', id],
            queryFn: () => userGyakorlatAPI.fetchUserGyakorlatok({ userId: id, isRecord: true }),
        });
    },
    
}

export default useUserGyakorlat;