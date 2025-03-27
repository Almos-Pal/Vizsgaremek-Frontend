import { gyakorlatApi } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useToken = () => {
  const { data: session } = useSession();
  return session?.backendTokens?.accessToken;
};

interface GetGyakorlatokParams {
  page?: number;
  limit?: number;
  userId?: number | null;
  nev?: string;
  izomcsoportId?: number;
  izomcsoportok?: number[];
  eszkoz?: string;
}

const useGyakorlat = {
  getGyakorlatok: (params: GetGyakorlatokParams = {}) => {
    const token = useToken();
    return useQuery({
      queryKey: ['gyakorlatok', params, token],
      queryFn: () => gyakorlatApi.fetchGyakorlatok({ ...params, token }),
    });
  },

  getIzomcsoportok: () => {
    const token = useToken();
    return useQuery({
      queryKey: ['izomcsoportok', token],
      queryFn: () => gyakorlatApi.getIzomcsoportok(token),
    });
  },

  getGyakorlat: (id: number) => {
    const token = useToken();
    return useQuery({
      queryKey: ['gyakorlat', id, token],
      queryFn: () => gyakorlatApi.getGyakorlat(id, token),
    });
  },

  createGyakorlat: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['createGyakorlat'],
      mutationFn: (newGyakorlat: any) => gyakorlatApi.createGyakorlat(newGyakorlat, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },

  updateGyakorlat: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['updateGyakorlat'],
      mutationFn: (updatedData: { id: number; updatedGyakorlat: any }) =>
        gyakorlatApi.updateGyakorlat(updatedData.id, updatedData.updatedGyakorlat, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },

  deleteGyakorlat: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['deleteGyakorlat'],
      mutationFn: (id: number) => gyakorlatApi.deleteGyakorlat(id, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },
};

export default useGyakorlat;
