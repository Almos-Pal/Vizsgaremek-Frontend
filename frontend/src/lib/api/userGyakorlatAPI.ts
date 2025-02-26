import { PaginatedResponse } from '@/types';
import { UserGyakorlat } from '../../types/userGyakorlat';

interface fetchUserGyakorlatokParams {
    page?: number;
    limit?: number;
    userId?: number | null;
}

const userGyakorlatAPI = {
    fetchUserGyakorlatok: async ({
        page = 1,
        limit = 1000,
        userId = null,
        
      }: fetchUserGyakorlatokParams = {}): Promise<PaginatedResponse<UserGyakorlat>> => {
        const params: Record<string, string> = {
          page: page.toString(),
          limit: limit.toString(),
        };
    
        if (userId !== null) params.userId = userId.toString();
    
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`http://localhost:8000/user-gyakorlat/user/${query}`);
    
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
    
        return response.json() as unknown as PaginatedResponse<UserGyakorlat>;
      },
    
}