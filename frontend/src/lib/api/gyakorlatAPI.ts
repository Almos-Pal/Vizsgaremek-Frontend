import {Gyakorlat, PaginatedResponse, } from "@/types"

const gyakorlatApi = {
    fetchGyakorlatok: async ({ page = 1, limit = 10, userId = null }: { page?: number, limit?: number, userId?: number | null } = {}): Promise<PaginatedResponse<Gyakorlat>> => {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(userId !== null && { userId: userId.toString() }), 
      }).toString();
  
      const response = await fetch(`http://localhost:8000/gyakorlat?${query}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      return response.json() as unknown as PaginatedResponse<Gyakorlat>;
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