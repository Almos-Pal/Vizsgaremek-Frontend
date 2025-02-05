import React from 'react'
import { Edzes } from '@/types/edzes'
import page from '@/app/edzes/page';
import { PaginatedResponse } from '@/types';

interface FetchEdzesekParams {
  page?: number;
  limit?: number;
  // other properties
  userId?: number | null;
  edzes_neve?: string;
  gyakorlatok?: number[];
  //izomcsoportId?: number;
  //izomcsoportok?: number[];
}

const edzesAPI = {
  fetchEdzesek: async ({
    page = 1,
    limit = 3,
    userId = null,
    edzes_neve,
    gyakorlatok,
  }: FetchEdzesekParams = {}): Promise<PaginatedResponse<Edzes>> => {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (userId !== null) params.userId = userId.toString();
    if (edzes_neve) params.edzes_neve = edzes_neve;
    if (gyakorlatok?.length) params.gyakorlatok = gyakorlatok.join(',');

    const query = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:8000/edzes?${query}`);

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    return response.json() as unknown as PaginatedResponse<Edzes>;
  },

  fetchEdzes: async (id: number): Promise<Edzes> => {
    const response = await fetch(`http://localhost:8000/edzes/${id}`);

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    return response.json() as unknown as Edzes;
  }

}
  
export default edzesAPI