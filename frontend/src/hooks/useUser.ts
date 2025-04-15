import { gyakorlatApi, userApi } from "@/lib/api";
import { Bmi } from "@/types/user";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type GetUsersParams = Parameters<typeof userApi.getUsers>[0];

export const useToken = () => {
    const { data: session } = useSession();
    return session?.backendTokens?.accessToken;
};


const useUser = {

    getUser: (id: number) => {
        const token = useToken();

        return useQuery({
            queryKey: ['user', id],
            queryFn: () => userApi.getUser(id, token),
            retry: 2
        });
    },


    getUsers: (params: GetUsersParams = {}) => {
        const token = useToken();
        return useQuery({
            queryKey: ['users', params],
            queryFn: () => userApi.getUsers({...params, token}),
        });
    },

    getBmi: (id: number) => {

        const token = useToken();
        return useQuery({
            queryKey: ['bmi', id],
            queryFn: () => userApi.getBmi(id, token),
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
            retry: 1
        });
    },


    updateUser: () => {
        const token = useToken();
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['updateUser'],
            mutationFn: ({ id, values }: { id: number, values: Bmi }) => userApi.updateUser(id, values, token),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] });
            },
        });
    },


    deleteUser: () => {
        const token = useToken();
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['deleteUser'],
            mutationFn: (id: number) => userApi.deleteUser(id, token),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
            }
        });
    },

    updateAdminAccess: () => {

        const queryClient = useQueryClient();
        const token = useToken();
        return useMutation({
            mutationKey: ['updateAdminAccess'],
            mutationFn: ({ id, values }: { id: number, values: boolean }) => userApi.updateAdminAccess(id, values, token),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
            }
        });
    }
};

export default useUser;