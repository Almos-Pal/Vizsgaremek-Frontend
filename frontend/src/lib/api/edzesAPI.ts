import { CurrentWeekEdzes, Edzes, EdzesTenDays } from '@/types/edzes'
import { PaginatedResponse } from '@/types';
import page from '@/app/test/akos/page';
import { use } from 'react';

interface FetchEdzesekParams {
  page?: number;
  limit?: number;
  // other properties
  user_id?: number | null;
  favoriteExercises?: boolean;
  edzes_neve?: string;
  gyakorlatok?: number[];
  isTemplate?: boolean;
  gyakorlat_id?: number | null;
  
  orderBy?: string;
  //izomcsoportId?: number;
  //izomcsoportok?: number[];
}
const edzesAPI = {
  fetchEdzesek: async ({
    page = 1,
    limit = 3,
    user_id = null,
    favoriteExercises = false,
    edzes_neve,
    gyakorlatok,
    isTemplate,
    gyakorlat_id = null,
    orderBy,
    token, 
  }: FetchEdzesekParams & { token?: string } = {}): Promise<PaginatedResponse<Edzes>> => {
    
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      orderBy: orderBy?.toString() || "desc",
    };
    if (user_id) params.user_id = user_id.toString();
    if (gyakorlat_id) params.gyakorlat_id = gyakorlat_id.toString();
    if (isTemplate) params.isTemplate = isTemplate.toString();
    if (orderBy) params.orderBy = orderBy;
    if (favoriteExercises) params.favoriteExercises = favoriteExercises.toString();
    if (edzes_neve) params.edzes_neve = edzes_neve;
    if (gyakorlatok?.length) params.gyakorlatok = gyakorlatok.join(',');
    
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:8000/edzes?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });
  
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
  
    return response.json() as unknown as PaginatedResponse<Edzes>;
  },
  

  fetchEdzes: async (id: number, token?: string): Promise<Edzes> => {
    const response = await fetch(`http://localhost:8000/edzes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    return response.json() as unknown as Edzes;
  },

  createEdzes: async (newEdzes: any, token?: string) => {
    

    const response = await fetch('http://localhost:8000/edzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(newEdzes),
    });

    if (!response.ok) {
      if(response.status === 409) {
        throw new Error("409");
      }      
      throw new Error('Error creating edzes');
      
    }

    return response.json();
  },

  updateEdzes: async (id: number, updatedEdzes: any, token?: string) => {
    const response = await fetch(`http://localhost:8000/edzes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(updatedEdzes),
    });

    if (!response.ok) {
      throw new Error('Error updating edzes');
    }

    return response.json();
  },

  deleteEdzes: async (id: number, token?: string) => {
    const response = await fetch(`http://localhost:8000/edzes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting edzes');
    }

    return response.json();
  },

  
  addGyakorlatToEdzes: async (edzesId: number, userId: number, gyakorlatId: number, token?: string) => {
    const response = await fetch(`http://localhost:8000/edzes/${edzesId}/gyakorlat/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ gyakorlat_id: gyakorlatId }),
    });

    if (!response.ok) {
      throw new Error('Error adding gyakorlat to edzes');
    }

    return response.json();
  },

  deleteGyakorlatFromEdzes: async (edzesId: number, gyakorlatId: number, userId: number, token?: string) => {
    const response = await fetch(
      `http://localhost:8000/edzes/${edzesId}/gyakorlat/${gyakorlatId}/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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

  addSetToGyakorlatInEdzes: async (edzes_id: number, gyakorlatId: number, userId: number, setDetails: { set_szam: number; weight: number; reps: number }, token?: string) => {
    const response = await fetch(`http://localhost:8000/edzes/${edzes_id}/gyakorlat/${gyakorlatId}/set/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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
    updateDetails: { weight: number; reps: number },
    token?: string
  ) => {
    const response = await fetch(
      `http://localhost:8000/edzes/${edzes_id}/gyakorlat/${gyakorlatId}/set/${setId}/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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
    userId: number,
    token?: string
  ) => {
    const response = await fetch(
      `http://localhost:8000/edzes/${edzes_id}/gyakorlat/${gyakorlatId}/set/${setId}/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error deleting set from edzes');
    }

    return response.json();
  },

  createEdzesTemplate: async (templateId:number, userId:number, date:string, token?: string ) => {
    const response = await fetch(`http://localhost:8000/edzes/template/${templateId}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ date }),
      
    });
    if (!response.ok) {
      throw new Error('Error creating edzés from template');
    }

    return response.json();
  },

  changeEdzesFinalizedStatus: async (edzesId: number, userId: number, finalized: boolean, token?: string) => {
    const response = await fetch(`http://localhost:8000/edzes/${edzesId}/finalize/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ finalized }),
    });

    if (!response.ok) {
      throw new Error('Error updating edzés finalized status');
    }

    return response.json();
  },


  fetchEdzesIntervallum: async (userId: number, startDate: string, endDate: string, token?: string) => {
    const response = await fetch(`http://localhost:8000/edzes/intervallum?user_id=${userId}&startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    return response.json() as unknown as Edzes[];
  },


  fetchTenDays: async (userId: number,gyakorlat:number, token?: string) => {

    const response = await fetch(`http://localhost:8000/edzes/ten?userId=${userId}&gyakorlat=${gyakorlat}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    return response.json() as unknown as EdzesTenDays[];
  },
  

  fetchEdzesekChosenDate: async (userId: number, type:string, token? : string) => {
    const params = {
      page: "1",
      limit:"100",
      user_id:userId.toString(),
      type:type
    };
    const query = new URLSearchParams(params).toString();

    const response = await fetch(`http://localhost:8000/edzes/intervallum?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    return response.json() as unknown as Edzes[];
  },

  fetchCurrentWeek: async (userId: number, token?: string ) => {
    const response = await fetch(`http://localhost:8000/edzes/current-week/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    return response.json() as unknown as CurrentWeekEdzes;
  },
  findOneByDate: async (userId: number, date: string, token?: string) => {
    const response = await fetch(`http://localhost:8000/edzes/napi?userId=${userId}&date=${date}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    
    return response.json() as unknown as Edzes;
  },
};

export default edzesAPI;
