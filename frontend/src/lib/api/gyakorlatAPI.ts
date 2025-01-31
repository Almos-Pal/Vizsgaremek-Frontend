import {Gyakorlat, PaginatedResponse, } from "@/types"

interface FetchGyakorlatokParams {
  page?: number;
  limit?: number;
  userId?: number | null;
  nev?: string;
  izomcsoportId?: number;
  izomcsoportok?: number[];
  eszkoz?: string;
}

interface Izomcsoport {
  izomcsoport_id: number;
  nev: string;
}

const gyakorlatApi = {
    fetchGyakorlatok: async ({ 
      page = 1, 
      limit = 10, 
      userId = null,
      nev,
      izomcsoportId,
      izomcsoportok,
      eszkoz
    }: FetchGyakorlatokParams = {}): Promise<PaginatedResponse<Gyakorlat>> => {
      const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (userId !== null) params.userId = userId.toString();
      if (nev) params.nev = nev;
      if (izomcsoportId) params.izomcsoportId = izomcsoportId.toString();
      if (izomcsoportok?.length) params.izomcsoportok = izomcsoportok.join(',');
      if (eszkoz) params.eszkoz = eszkoz;

      const query = new URLSearchParams(params).toString();
      const response = await fetch(`http://localhost:8000/gyakorlat?${query}`);
      
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      return response.json() as unknown as PaginatedResponse<Gyakorlat>;
    },
  
    getIzomcsoportok: async (): Promise<Izomcsoport[]> => {
      const response = await fetch('http://localhost:8000/izomcsoport');
      if (!response.ok) {
        throw new Error('Error fetching muscle groups');
      }
      return response.json();
    },
  
    createGyakorlat: async (newGyakorlat:any) => {
      const response = await fetch('http://localhost:8000/gyakorlat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGyakorlat),
      });
  
      if (!response.ok) {
        throw new Error('Error creating data');
      }
      return response.json();
    },
  
    updateGyakorlat: async ({ id, values }: { id: number, values: any }) => {
      const response = await fetch(`http://localhost:8000/gyakorlat/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Error updating data');
      }
    return response.json() as unknown as Gyakorlat;
    },
    getGyakorlat: async (id: number): Promise<Gyakorlat> => {
    const response = await fetch(`http://localhost:8000/gyakorlat/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json() as unknown as Gyakorlat;
    },
    deleteGyakorlat: async (id: number): Promise<Gyakorlat> => {
      const response = await fetch(`http://localhost:8000/gyakorlat/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error deleting data');
      }
      return response.json();
    },
  };

  export default  gyakorlatApi;