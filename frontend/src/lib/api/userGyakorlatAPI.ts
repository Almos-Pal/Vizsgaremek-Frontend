import { PaginatedResponse, RecordItem, UserGyakorlatGyakorlat } from '@/types';

interface fetchUserGyakorlatokParams {
    userId?: number | null;
    page?: number;
    limit?: number;
    isRecord?: boolean;
    search?: string;
}

const userGyakorlatAPI = {
    fetchUserGyakorlatok: async ({
        userId = null,
        page = 1,
        limit = 10,
        search = '',
        isRecord = false,
    }: fetchUserGyakorlatokParams = {}): Promise<PaginatedResponse<RecordItem>> => {
        const params: Record<string, string> = {
            page: page.toString(),
            limit: limit.toString(),
        };

        const query = new URLSearchParams(params).toString();
        const url = `http://localhost:8000/user-gyakorlat/user/${userId}?${query}&isRecord=${isRecord ? 'true' : 'false'}&search=${search}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error fetching data');
        }

        return response.json() as unknown as PaginatedResponse<RecordItem>;
    },
};

export default userGyakorlatAPI;
