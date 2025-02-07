import { userApi } from "@/lib/api";
import { Bmi } from "@/types/user";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const useUser = {
    getUser: (id: number) => {
        const { data: session } = useSession();
        const token = session?.backendTokens?.accessToken;

        return useQuery({
            queryKey: ['user', id],
            queryFn: () => userApi.getUser(id, token),
        });
    },
    getBmi: (id: number) => {
        return useQuery({
            queryKey: ['bmi', id],
            queryFn: () => userApi.getBmi(id),
            refetchOnWindowFocus: false, // Prevents refetch on window focus
            staleTime: 5 * 60 * 1000, 
        });
    }
};

export default useUser;