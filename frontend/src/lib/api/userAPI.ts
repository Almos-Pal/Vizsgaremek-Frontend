import { Bmi, User } from "@/types/user";




const userApi = {
    getUsers: async (): Promise<User[]> => {
        const response = await fetch('http://localhost:8000/users');
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        return response.json();
    },

    getUser: async (id: number, token?: string): Promise<User> => {
        const response = await fetch(`http://localhost:8000/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
        });
        
        if (!response.ok) {
            throw new Error('Error fetching user');
        }
        return response.json();
    },

    updateUser: async (id: number, values: Bmi): Promise<User> => {
        const response = await fetch(`http://localhost:8000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error('Error updating user');
        }
        return response.json();
    },

    deleteUser: async (id: number): Promise<{ message: string }> => {
        const response = await fetch(`http://localhost:8000/users/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting user');
        }
        return response.json();
    },

    getBmi: async (id: number): Promise<{ bmi: string; type: string }> => {
        const response = await fetch(`http://localhost:8000/users/${id}/bmi`);
        if (!response.ok) {
          const error: any = new Error('Error fetching BMI');
          error.status = response.status;
          throw error;
        }
        return response.json();
      },
    };
    

export default userApi;