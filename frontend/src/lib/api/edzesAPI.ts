import { Edzes, EdzesTenDays } from '@/types/edzes'
import { PaginatedResponse } from '@/types';

interface FetchEdzesekParams {
  page?: number;
  limit?: number;
  // other properties
  user_id?: number | null;
  edzes_neve?: string;
  gyakorlatok?: number[];
  //izomcsoportId?: number;
  //izomcsoportok?: number[];
}
const edzesAPI = {
  fetchEdzesek: async ({
    page = 1,
    limit = 3,
    user_id = null,
    edzes_neve,
    gyakorlatok,
  }: FetchEdzesekParams = {}): Promise<PaginatedResponse<Edzes>> => {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (user_id ) params.user_id = user_id.toString();
    
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
  },

  createEdzes: async (newEdzes: any) => {
    const response = await fetch('http://localhost:8000/edzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEdzes),
    });

    if (!response.ok) {
      throw new Error('Error creating edzes');
    }

    return response.json();
  },

  updateEdzes: async (id: number, updatedEdzes: any) => {
    const response = await fetch(`http://localhost:8000/edzes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEdzes),
    });

    if (!response.ok) {
      throw new Error('Error updating edzes');
    }

    return response.json();
  },

  deleteEdzes: async (id: number) => {
    const response = await fetch(`http://localhost:8000/edzes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting edzes');
    }

    return response.json();
  },

  
  addGyakorlatToEdzes: async (edzesId: number, userId: number, gyakorlatId: number) => {
    const response = await fetch(`http://localhost:8000/edzes/${edzesId}/gyakorlat/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gyakorlat_id: gyakorlatId }),
    });

    if (!response.ok) {
      throw new Error('Error adding gyakorlat to edzes');
    }

    return response.json();
  },

  deleteGyakorlatFromEdzes: async (edzesId: number, gyakorlatId: number, userId: number) => {
    const response = await fetch(
      `http://localhost:8000/edzes/${edzesId}/gyakorlat/${gyakorlatId}/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Error deleting gyakorlat from edzes');
    }
  
    // Handle empty response body:
    if (response.status === 204) {
      return null;
    }
  
    return response.json();
  },

  addSetToGyakorlatInEdzes: async (edzes_id: number, gyakorlatId: number, userId: number, setDetails: { set_szam: number; weight: number; reps: number }) => {
    const response = await fetch(`http://localhost:8000/edzes/${edzes_id}/gyakorlat/${gyakorlatId}/set/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setDetails),
    });

    if (!response.ok) {
      throw new Error('Error adding set to edzes');
    }

    return response.json();
  },

  updateSetInGyakorlatInEdzes: async (
    edzes_id: number,
    gyakorlatId: number,
    setId: number,
    userId: number,
    updateDetails: { weight: number; reps: number }
  ) => {
    const response = await fetch(
      `http://localhost:8000/edzes/${edzes_id}/gyakorlat/${gyakorlatId}/set/${setId}/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateDetails), 
      }
    );

    if (!response.ok) {
      throw new Error('Error updating set in edzes');
    }

    return response.json();
  },

  deleteSetFromGyakorlatInEdzes: async (
    edzes_id: number,
    gyakorlatId: number,
    setId: number,
    userId: number
  ) => {
    const response = await fetch(
      `http://localhost:8000/edzes/${edzes_id}/gyakorlat/${gyakorlatId}/set/${setId}/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error deleting set from edzes');
    }

    return response.json();
  },

  changeEdzesFinalizedStatus: async (edzesId: number, userId: number, finalized: boolean) => {
    const response = await fetch(`http://localhost:8000/edzes/${edzesId}/finalize/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ finalized }),
    });

    if (!response.ok) {
      throw new Error('Error updating edzés finalized status');
    }

    return response.json();
  },
  fetchEdzesIntervallum: async (userId: number, startDate: string, endDate: string) => {
    const response = await fetch(`http://localhost:8000/edzes/intervallum?user_id=${userId}&startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    return response.json() as unknown as Edzes[];
  },
  fetchTenDays: async (userId: number,gyakorlat:number) => {
    const response = await fetch(`http://localhost:8000/edzes/ten?userId=${userId}&gyakorlat=${gyakorlat}`);

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    return response.json() as unknown as EdzesTenDays[];
  }
  
};

export default edzesAPI;
