import userGyakorlatAPI from "@/lib/api/userGyakorlatAPI";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface GetRecordsParams {
    page?: number;
    limit?: number;
    isRecord?:  boolean;
    search?: string;
    userId?: number | null;

  }

export const useToken = () => {
  const { data: session } = useSession();
  return session?.backendTokens?.accessToken;
};

const useUserGyakorlat = {
    getRecords: (params: GetRecordsParams) => {
        const token = useToken();
        return useQuery({
            queryKey: ['userGyakorlat', params],
            queryFn: () => userGyakorlatAPI.fetchUserGyakorlatok(params, token),
        });
    },
    
    fetchUserGyakorlatokAll:(params: {
        userId?: number | null;
        page?: number;
        limit?: number;
    }= {}) => {
      const token = useToken();
        return useQuery({
          queryKey: ['user-gyakorlatok/user', params],
          queryFn: () => userGyakorlatAPI.fetchUserGyakorlatokAll(params, token),
        });
      },
}
export default useUserGyakorlat;