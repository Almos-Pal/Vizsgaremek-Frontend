import { useQuery } from "@tanstack/react-query";
import { userGyakorlatAPI } from "@/lib/api";




const useUserGyakorlat = {
    getUserGyakorlatok:(params: {
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