import userGyakorlatAPI from "@/lib/api/userGyakorlatAPI";
import { useQuery } from "@tanstack/react-query";

interface GetRecordsParams {
    page?: number;
    limit?: number;
    isRecord?:  boolean;
    search?: string;
    userId?: number | null;

  }


const useUserGyakorlat = {
    getRecords: (params: GetRecordsParams) => {
        return useQuery({
            queryKey: ['userGyakorlat', params],
            queryFn: () => userGyakorlatAPI.fetchUserGyakorlatok(params),
        });
    },
    
    fetchUserGyakorlatokAll:(params: {
        userId?: number | null;
        page?: number;
        limit?: number;
    }= {}) => {
        return useQuery({
          queryKey: ['user-gyakorlatok/user', params],
          queryFn: () => userGyakorlatAPI.fetchUserGyakorlatok(params),
        });
      },
}
export default useUserGyakorlat;