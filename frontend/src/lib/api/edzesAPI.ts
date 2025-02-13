import { Edzes } from '@/types/edzes'
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


}

export default edzesAPI