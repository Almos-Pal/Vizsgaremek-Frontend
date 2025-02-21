import { gyakorlatApi } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    return useQuery({
      queryKey: ['gyakorlatok', params],
      queryFn: () => gyakorlatApi.fetchGyakorlatok(params),
    });
  },

  getIzomcsoportok: () => {
    return useQuery({
      queryKey: ['izomcsoportok'],
      queryFn: () => gyakorlatApi.getIzomcsoportok(),
    });
  },

  getGyakorlat: (id: number) => {
    return useQuery({
      queryKey: ['gyakorlat', id],
      queryFn: () => gyakorlatApi.getGyakorlat(id),
    });
  },

  createGyakorlat: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['createGyakorlat'],
      mutationFn: gyakorlatApi.createGyakorlat,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },

  updateGyakorlat: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['updateGyakorlat'],
      mutationFn: gyakorlatApi.updateGyakorlat,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },

      
    });
  },

  deleteGyakorlat: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['deleteGyakorlat'],
      mutationFn: gyakorlatApi.deleteGyakorlat,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },
};

export default useGyakorlat;
