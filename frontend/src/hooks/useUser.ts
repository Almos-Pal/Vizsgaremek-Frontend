import { gyakorlatApi, userApi } from "@/lib/api";
import { Bmi } from "@/types/user";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type GetUsersParams = Parameters<typeof userApi.getUsers>[0];

const useUser = {
    getUser: (id: number) => {
        const { data: session } = useSession();
        const token = session?.backendTokens?.accessToken;

        return useQuery({
            queryKey: ['user', id],
            queryFn: () => userApi.getUser(id, token),
        });
    },
    getUsers: (params: GetUsersParams = {}) => {
        return useQuery({
          queryKey: ['users', params],
          queryFn: () => userApi.getUsers(params),
        });
    },
    getBmi: (id: number) => {
        return useQuery({
            queryKey: ['bmi', id],
            queryFn: () => userApi.getBmi(id),
            refetchOnWindowFocus: false, 
            staleTime: 5 * 60 * 1000, 
            retry: 1
        });
    },
    updateUser: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['updateUser'],
            mutationFn: ({ id, values }: { id: number, values: Bmi }) => userApi.updateUser(id, values),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] });
            },
        });
    },
    deleteUser: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['deleteUser'],
            mutationFn: userApi.deleteUser,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
            }
        });
    },
    updateAdminAccess: () => {
        const queryClient = useQueryClient();
        const { data: session } = useSession();
        const token = session?.backendTokens?.accessToken;
        return useMutation({
            mutationKey: ['updateAdminAccess'],
            mutationFn:  ({ id, values }: { id: number, values: boolean }) => userApi.updateAdminAccess(id, values,token),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
            }
        });
}
};

export default useUser;