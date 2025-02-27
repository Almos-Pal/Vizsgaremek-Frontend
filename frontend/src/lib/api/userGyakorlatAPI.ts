import { PaginatedResponse, UserGyakorlatGyakorlat } from '@/types';
//import { UserGyakorlat } from '../../types/userGyakorlat';

interface fetchUserGyakorlatokParams {
    userId?: number | null;
    page?: number;
    limit?: number;
}

const userGyakorlatAPI = {
    fetchUserGyakorlatok: async ({
        userId = null,
        page = 1,
        limit = 1000,
        
      }: fetchUserGyakorlatokParams = {}): Promise<PaginatedResponse<UserGyakorlatGyakorlat>> => {
        const params: Record<string, string> = {
          page: page.toString(),
          limit: limit.toString(),
        };
    
        // if (userId !== null) params.userId = userId.toString();
    
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`http://localhost:8000/user-gyakorlat/user/${userId}?${query}`);
    
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
    
        return response.json() as unknown as PaginatedResponse<UserGyakorlatGyakorlat>;
      },

    
    
}
export default userGyakorlatAPI;