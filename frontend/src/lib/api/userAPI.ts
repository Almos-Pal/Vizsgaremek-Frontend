import { Bmi, User } from "@/types/user";
import { PaginatedResponse } from "@/types";
import { BACKEND_URL } from "@/utils";

interface GetUsersParams {
  page?: number;
  limit?: number;
  username?: string;
  email?: string;
  isAdmin?: boolean;
  token?: string;
}

const userApi = {
  getUsers: async ({
    page = 1,
    limit = 10,
    username,
    email,
    isAdmin,
    token,
  }: GetUsersParams = {}): Promise<PaginatedResponse<User>> => {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (username) params.username = username;
    if (email) params.email = email;
    if (isAdmin !== undefined) params.isAdmin = isAdmin.toString();

    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${BACKEND_URL}/users?${query}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    return response.json();
  },

  getUser: async (id: number, token?: string): Promise<User> => {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Error fetching user") as any;
      error.status = response.status;
      throw error;
    }
    return data;
  },

  updateUser: async (
    id: number,
    values: Bmi,
    token?: string
  ): Promise<User> => {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Error updating user");
    }
    return response.json();
  },

  deleteUser: async (
    id: number,
    token?: string
  ): Promise<{ message: string }> => {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting user");
    }
    return response.json();
  },

  getBmi: async (
    id: number,
    token?: string
  ): Promise<{ bmi: string; type: string }> => {
    const response = await fetch(`${BACKEND_URL}/users/${id}/bmi`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const error: any = new Error("Error fetching BMI");
      error.status = response.status;
      throw error;
    }
    return response.json();
  },

  updateAdminAccess: async (
    id: number,
    isAdmin: boolean,
    token?: string
  ): Promise<User> => {
    const response = await fetch(`${BACKEND_URL}/users/${id}/admin`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ isAdmin }),
    });
    if (!response.ok) {
      throw new Error("Error updating user");
    }
    return response.json();
  },
};

export default userApi;
